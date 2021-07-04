const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const users = ['Abir','Karim','Abul','Aslam'];
app.get('/',(req,res)=>{
    const fruits = {
        name:'Mango',
        price:'250'
    } 
    res.send(fruits);
})

app.get('/fruits/mango',(req,res)=>{
    res.send({name:'Mango',quantity:20,price:200})
})

app.get('/user/:id',(req,res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({id,name})
})

app.listen(8000,()=>{console.log('listen to port 8000')});