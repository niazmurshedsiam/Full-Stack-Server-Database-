const express = require('express');
const app = express();

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

app.listen(8000,()=>{console.log('listen to port 8000')});