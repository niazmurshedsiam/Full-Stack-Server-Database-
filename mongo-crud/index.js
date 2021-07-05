const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://MyDbUser:Tx9W5hHTVvxGSTTY@cluster0.bm8mo.mongodb.net/myDbUser?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/',(req,res)=>{
    res.send('hello');
})

client.connect(err => {
  const collection = client.db("myDbUser").collection("user");
  console.log('DataBase Connected');
  // perform actions on the collection object
  client.close();
});


app.listen(8000,()=>console.log('listen start port 8080'));