const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.port || 5000;
// console.log(process.env.DB_NAME);
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm8mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  // console.log('Conection Error',err);
  const eventsCollection = client.db("VolunteerNetwork").collection("events");
  
  app.get('/events', (req, res) => {
        eventCollection.find()
        .toArray((err, items) => {
            res.send(items)
        })
    })
    app.delete('deleteEvent/:id', (req, res) => {
      const id = ObjectID(req.params.id);
      console.log('delete this', id);
      eventCollection.findOneAndDelete({_id: id})
      .then(documents => res.send(!!documents.value))
  })
  
  app.post('/addEvent',(req,res)=>{
    const newEvent = req.body;
    // console.log('Add by new event: ', newEvent);
    eventsCollection.insertOne(newEvent)
    .then(result =>{
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  console.log('Database Connection');
  // client.close();


});

app.listen(port, () => {
  console.log(`Example app listening ${port}`)
})