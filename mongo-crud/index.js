const express = require('express');

const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://organicUser:XZSU0qCXkXDvY0eP@cluster0.bm8mo.mongodb.net/myDbUser?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})
client.connect(err => {
  const collection = client.db("myDbUser").collection("products");
  
  app.post('/addProduct',(req,res)=>{
    const product = req.body;
    collection.insertOne(product)
    .then(result=>{
      console.log("Data Add Database");
      res.send('success');
    })
    
    

  })
  
  console.log('connent');
  // perform actions on the collection object
  // client.close();
});
app.listen(8000,()=>console.log('listen start port 8080'));
