const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://organicUser:XZSU0qCXkXDvY0eP@cluster0.bm8mo.mongodb.net/myDbUser?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})
client.connect(err => {
  const collection = client.db("myDbUser").collection("products");
  collection.insertOne({name:"Alu",price:24,quantity:2})
  .then(res=>{
    console.log('Add Databsae data');
  })
  console.log('connent');
  // perform actions on the collection object
  // client.close();
});
app.listen(8000,()=>console.log('listen start port 8080'));
