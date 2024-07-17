// 1. server connection
const express =require('express')
require('dotenv').config()
PORT = process.env.PORT
const app = express()
// 3.db connection

const mongoose =require('mongoose')
mongoose.connect(process.env.mongodb_url)
let db = mongoose.connection
const cookieparser = require('cookie-parser')


db.once('open',()=>{
    console.log("connected to db");
})


app.use(cookieparser())


// 2. routes checking
app.use(cookieparser())
app.use(express.json())
require('./routes/app.route')(app)
app.listen(PORT,()=>{
    console.log('Connecte to server at port', PORT);

})

