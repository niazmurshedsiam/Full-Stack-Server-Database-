const express = require('express');
const app = express();

app.get('/',(req,res)=>{res.send('Hello')})

app.listen(8000,()=>{console.log('listen to port 8000')});