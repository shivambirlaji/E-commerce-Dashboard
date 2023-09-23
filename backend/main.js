const express = require("express");
const Jwt = require("jsonwebtoken");
require('./db/config');
let user = require('./db/user');
const product = require('./db/product');
const cors = require("cors");
const mongodb = require('mongodb')


const app = express();
const jwtkey = "e-comm";
app.use(express.json());
app.use(cors());


app.post("/signup", async (req, resp) => {
    let User = new user(req.body);
    let result = await (User.save());
    result = result.toObject();


    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "something went wrong" })
        }
        resp.send({ result, auth: token })

    })

});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {

        let User = await user.findOne({ email: req.body.email })

        if (User) {

            if(req.body.password == User.password ){
                resp.send (User)  
            }else{
                resp.send( {msg : "password does not match "})
            }

        } else {
            resp.send({ result: "no user found" })
        }

    }
});


app.post("/addproduct", async (req, resp) => {
    let Product = new product(req.body);
    let result = await Product.save();
    resp.send(result)
})

app.get("/products", async (req, resp) => {
    let Products = await product.find();
    if (Products.length > 0) {
        resp.send(Products)

    } else {
        resp.send({ result: "no product  found" })
    }

});

app.delete("/product/:id", async (req, resp) => {

    let result = await product.deleteOne({ _id: req.params.id });
    resp.send(result)
})

app.get("/product/:id", async (req, resp) => {
    let result = await product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "result not found" })
    }
})

app.put("/product/:id", async (req, resp) => {

    let result = await product.updateOne(
        { _id: new mongodb.ObjectId(req.params.id) },

        {
            $set: req.body
        }

    )
    resp.send(result)

})

app.get("/search/:key", async (req, resp) => {

    let result = await product.find({

        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    resp.send(result)

})

app.listen(4000);
console.log("hlw");