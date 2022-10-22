const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./dbConnect");
const items = require("./itemModel");

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});



// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    next();
});


// register endpoint
app.post("/addVendorItems", async (request, response) => {
    const itemId = request.body.itemId;
    const quantity = request.body.quantity;
    const price = request.body.price;
    const item = await items.find({ itemId: itemId });
    if (item.length === 0) {
        const date = new items({
            itemId: itemId,
            quantity: quantity,
            price: price
        });

        // save the new user
        date.save()
            // return success if the new user is added to the database successfully
            .then((result) => {
                response.status(201).send({
                    message: "items Saved Suceessfully",
                    result,
                });
            })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                response.status(500).send({
                    message: "Error Saving items",
                    error,
                });
            });
    }
    else {
        item[0].quantity += quantity;
        await items.findOneAndUpdate({ itemId: itemId }, { quantity: item[0].quantity })
            .then((result) => {
                response.status(201).send({
                    message: "items Saved Suceessfully",
                    result,
                });
            })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                response.status(500).send({
                    message: "Error Saving items",
                    error,
                });
            });

    }
});



// register endpoint
app.post('/getVendorItems', async (request, response) => {
    const itemIds = request.body.itemIds;
    // const itemId = request.body.itemId;
    // const quantity = request.body.quantity;
    if (itemIds === undefined || itemIds.length === 0) {
        response.json({ "dates": "items not Found" });
    }
    else {
        const ans = [];
        for (var i = 0; i < itemIds.length; i++) {
            let item = await items.find({ itemId: itemIds[i] })
            if(item===undefined)
            continue;
            if (item.length !== 0) {
                let test1 = {};
                test1['itemId'] = item[0].itemId;
                test1['quantity'] = item[0].quantity;
                test1['vendor_wallet_address'] = process.env.WALLAT_ADDRESS;
                test1['price'] = item[0].price;
                // console.log(test1);
                // console.log(test));
                ans.push(test1);
            }
        }
        const resp = await ans.length ? { "itemsList": ans } : { "message": "No Records Found" }
        await response.json(resp)
    }
})

app.post('/getAllVendorItems', async (request, response) => {
    const message = request.body.message;
    // const itemId = request.body.itemId;
    // const quantity = request.body.quantity;
    if (message === undefined || message !== 'pda') {
        response.json({ "data": "message not Found" });
    }
    else {
        let itemsl = await items.find();
        console.log(itemsl);
        const resp = await itemsl.length ? { "itemsList": itemsl } : { "message": "No items Found" }
        await response.json(resp)
    }
})





module.exports = app;
