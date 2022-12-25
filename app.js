const dotenv = require('dotenv')

dotenv.config()
const express = require("express");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://Tair00:werty247@cluster0.8ddgcpp.mongodb.net/Aresdb?retryWrites=true&w=majority";

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected :)");
        const myDb = db.db("myDb");
        const UserCollection = myDb.collection("User");
        const PayCollection = myDb.collection("Pay");
        app.post("/signup", (req, res) => {
            const newUser = {
                name: req.body.name,
                phone: req.body.phone,
                addres: req.body.addres,
                password: req.body.password,
                
            };

            const query = { phone: newUser.phone };

            UserCollection.findOne(query, (err, result) => {
                if (result == null) {
                    UserCollection.insertOne(newUser, (err, result) => {
                        res.status(200).send("user tut");
                    });
                } else {
                    res.status(400).send();
                }
            });
        });

        app.post("/login", (req, res) => {
            const query = {
                name: req.body.name,
                password: req.body.password,
            };

            UserCollection.findOne(query, (err, result) => {
                if (result != null) {
                    const objToSend = {
                        name: result.name,
                        password: result.password,
                    };

                    res.status(200).send(JSON.stringify(objToSend));
                } else {
                    res.status(404).send({
                        message: "incorrect login or password",
                    });
                }
            });
        });
        app.post("/pay", (req, res) => {
            const newPay = {
                pay: req.body.pay,
                totalTxt: req.body.totalTxt,
                address: req.body.address
                
                
            };
        
            const query = { totalTxt: newPay.totalTxt };
        
            PayCollection.findOne(query, (err, result) => {
                if (result == null) {
                    PayCollection.insertOne(newPay, (err, result) => {
                        res.status(200).send("Оплата прошла ");
                    });
                } else {
                    res.status(400).send();
                }
            });
        });
        
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server start on poer ${process.env.PORT}`);
});
