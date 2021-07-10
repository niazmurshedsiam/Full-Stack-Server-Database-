const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://BurjAlArab:EQa8QXdsb8WVFNMq@cluster0.bm8mo.mongodb.net/BurjAlArabek?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("BurjAlArabek").collection("bookings");
  console.log('connected');
  // perform actions on the collection object
  client.close();
});

app.get('/',(req,res)=>{
    res.send('hello');
})
app.listen(8000,()=>{console.log('app listening port 8000')})


// const pass = EQa8QXdsb8WVFNMq///Burj Al Arab;