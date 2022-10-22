const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const CONTRACT_ABI = require('./config');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

app.use(cors());
app.use(express.json());

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
    response.json({ message: "This is authentications server on blockchain, Do post request with proper data" });
    // next();
});


// app.get("/", (request, response) => {
//     response.json({ message: "Hey! This is authentications server on blockchain, Do post request with proper data" });
// });

var provider = new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY);
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(CONTRACT_ABI.CONTRACT_ABI, process.env.CONTRACT_ADDRESS);


const verifyUser = async (userId, password) => {
    const data = await myContract.methods.checkPassword(userId).call();
    if(data == password){
        return "Login Successful";
    }
    else{
        return "Incorrect Password or User Not Registered";
    }
}

const addUser = async (userId, password) => {
    const res = await myContract.methods.addUser(userId, password).send({
        from: process.env.ACCOUNT
    });
    return res;
}

app.post("/register", async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    await addUser(userId, password).then((result) => {
        res.status(201).send({
            message: "Register Sucessfully",
            info: result
        });
    }).catch((error) => {
        res.status(500).send({
            message: "Error Registering User",
            error,
        });
    });;
})

app.post("/login", async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    await verifyUser(userId,password).then((result)=>{
        res.status(201).send({
            message: result
        })
    }).catch((error) => {
        res.status(500).send({
            message: "Error While Login",
            error,
        });
    });;
})


module.exports = app;
