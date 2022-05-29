const express = require('express')
const mongoose = require("mongoose")
const app= express

const DB="mongodb+srv://Qusai:qusai@cluster0.wttqe.mongodb.net/merntest?retryWrites=true&w=majority"

mongoose.connect(DB).then(()=>{
    console.log('connection succeful!');
}).catch((err)=>{
    console.log(err);
})
