const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = process.env.PORT || 3020;
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection success")
})
const userschema = new mongoose.Schema({
    name : String,
    email :String,
    phone : String,
    checkinDate : Date,
    checkoutDate : Date
})
const Users = mongoose.model("data",userschema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'new-page.html'))
})

app.post('/post',async (req,res)=>{
    const {name,email,phone,checkinDate,checkoutDate} = req.body
  const user = new Users({
    name,
    email,
    phone,
    checkinDate,
    checkoutDate
  })
  await user.save()
  console.log(user)
  res.sendFile(path.join(__dirname,'confirm.html'))
})

app.listen(port, ()=>{
console.log("Server started")
})

