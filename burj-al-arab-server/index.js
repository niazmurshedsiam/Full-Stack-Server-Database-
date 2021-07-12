const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://BurjAlArab:EQa8QXdsb8WVFNMq@cluster0.bm8mo.mongodb.net/BurjAlArabek?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("BurjAlArabek").collection("bookings");
  console.log('connected');
  // perform actions on the collection object
  app.post('/addBooking',(req,res)=>{
    const newBooking = req.body;
    bookings.insertOne(newBooking)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
    console.log(newBooking);
  })

  app.get('/bookings',(req,res)=>{
    bookings.find({email : req.query.email})
    .toArray((err,document)=>{
      res.send(document);
    })
  })
  
});

app.get('/',(req,res)=>{
    res.send('hello');
})
app.listen(8000,()=>{console.log('app listening port 8000')})


// const pass = EQa8QXdsb8WVFNMq///Burj Al Arab;