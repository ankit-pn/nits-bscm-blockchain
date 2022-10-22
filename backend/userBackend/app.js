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
app.post("/addItems", async (request, response) => {

    const userId = request.body.userId;
    const itemId = request.body.itemId;
    const quantity = parseInt(request.body.quantity);
    const item = await items.find({ userId: userId, itemId: itemId });
    if (item.length === 0) {
        const date = new items({
            userId: userId,
            itemId: itemId,
            quantity: quantity
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
        const fvalue = parseInt(item[0].quantity)+quantity
        const ittem = await items.findOneAndUpdate({ userId: userId, itemId: itemId }, { quantity: fvalue })
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
app.post('/getItems', async (request, response) => {
    const userId = request.body.userId;
    // const itemId = request.body.itemId;
    // const quantity = request.body.quantity;
    if (userId === undefined) {
        response.json({ "dates": "userId not Found" });
    }
    else {
        const item = await items.find({ userId: userId })
        const resp = await item.length ? { "itemsList": item } : { "message": "No Records Found" }
        await response.json(resp)
    }
})




// register endpoint
app.post('/deleteItems', async (request, response) => {
    const userId = request.body.userId;
    const itemId = request.body.itemId;
    // const quantity = request.body.quantity;
    await items.deleteOne({
        userId: userId,
        itemId:itemId
    })
        // save the new user
        // date.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: "Date Deleted Succesfully",
                result,
            });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "Error Saving Date",
                error,
            });
        });
    // const resp = await item.length ? { "itemsList": item } : { "message": "No Records Found" }
    // await response.json(resp)
})



module.exports = app;
