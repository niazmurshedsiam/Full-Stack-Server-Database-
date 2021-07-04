const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const users = ['Abir','Karim','Abul','Aslam'];
app.get('/',(req,res)=>{
    const fruits = {
        name:'Mango',
        price:'250'
    } 
    res.send(fruits);
})



app.get('/user/:id',(req,res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({id,name})
})

app.post('/addPost',(req,res)=>{
    console.log(req.body);
})



app.listen(8000,()=>{console.log('listen to port 8000')});