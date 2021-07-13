const express = require('express');
const cors = require('cors');
const bodyPaser = require('body-parser');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(bodyPaser.json())


const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm8mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("EmaJohnSimpleStore").collection("products");
  // perform actions on the collection object
  console.log('connected');
  client.close();
});

app.post('/addProduct',(req,res)=>{
    const product = req.body;
    products.insertOne(product)
    .then(result=>{
        console.log(result);
    })
})
app.get('/',(req,res)=>{
    res.send('Hello Ema John');
})

app.listen(5000,()=>{console.log('App listening port 5000')});