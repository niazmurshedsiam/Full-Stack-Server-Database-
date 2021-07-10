const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');
const objectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://organicUser:XZSU0qCXkXDvY0eP@cluster0.bm8mo.mongodb.net/myDbUser?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})
client.connect(err => {
  const collection = client.db("myDbUser").collection("products");

  app.get('/products',(req,res)=>{
    collection.find({}).limit(4)
    .toArray((err,document)=>{
      res.send(document);
    })

  })
  app.get('/product/:id',(req,res)=>{
    collection.find({_id: ObjectID(req.params.id)})
    .toArray((err,documents)=>{
      res.send(documents[0]);
    })
  })
  app.delete('/delete/:id',(req,res)=>{
    collection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result=>{
      console.log(result);

    })
    
  })
  app.patch('/update/:id',(req,res)=>{
    console.log(req.body.price);
    collection.updateOne({_id: ObjectID(req.params.id)},{
      $set: {price: req.body.price, quantity: req.body.quantity}
    })
    .then(result =>{
      console.log(result);
    })
  })
  
  // app.patch('/update/:id',(req,res)=>{
  //   collection.updateOne({_id: ObjectID(req.params.id)},
  //   {
  //       $set: { price: req.body.price, quantity: req.body.quantity}      
  //   })
  //   .then(result=>{
  //     console.log(result);
  //   })

  // })
  app.post('/addProduct',(req,res)=>{
    const product = req.body;
    collection.insertOne(product)
    .then(result=>{
      console.log('Data Add to Database');
      res.redirect('/');
    })
    
  })
  
  console.log('connent');
  // perform actions on the collection object
  // client.close();
});
app.listen(8000,()=>console.log('listen start port 8080'));
