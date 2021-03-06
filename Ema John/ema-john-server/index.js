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
  const productsCollection = client.db("ema").collection("products");
  const ordersCollection = client.db("ema").collection("products");
  
  // perform actions on the collection object
  app.post('/addProduct',(req,res)=>{
    const products = req.body;
    productsCollection.insertOne(products)
    
    .then(result=>{
        res.send(result.insertedCount)
    })
    console.log('connected');
})

app.get('/products',(req,res)=>{
    productsCollection.find({})
    .toArray((err,documents)=>{
        res.send(documents);
    })
})

app.get('/product/:key',(req,res)=>{
    productsCollection.find({key: req.params.key}).limit(20)
    .toArray((err,documents)=>{
        res.send(documents[0]);
    })
})

app.post('/productsByKeys', (req, res) => {
    const productKeys = req.body;
    productsCollection.find({key: { $in: productKeys} })
    .toArray( (err, documents) => {
        res.send(documents);
    })
})
  console.log('connected');

});

app.post('/addOrder',(req,res)=>{
    const order = req.body;
    ordersCollection.insertOne(order)
    
    .then(result=>{
        res.send(result.insertedCount)
    })
    console.log('connected');
})

app.get('/',(req,res)=>{
    res.send('Hello Ema John');
})

app.listen(5000,()=>{console.log('App listening port 5000')});