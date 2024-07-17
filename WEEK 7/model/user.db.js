const mongoose = require('mongoose')

let userschema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Name is mandatory"],
        minlengtth:2
    },
    email:{
        type:String,
        require:[true, "email is mandatory"],
        minlengtth:10,
        unique:true,
        unique:[true, 'Already resitered']
    },

    password:{
        type:String,
        require:[true, "Password is mandatory"],
        minlengtth:8,
        select:false
    },

    forgetpasswordtoken:{
        type:String
    },
    forgetpasswordExpirydate:{
        type:Date
    }

}, {timestamps:true , versionKey:false})

// inccyption
const bcrypt = require('bcrypt')
userschema.pre('save',async function(next){

if(!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password ,10)
next()

})




// creating jwt token


const jwt = require('jsonwebtoken')
userschema.methods= {
    jwtoken(){
      return  jwt.sign({
            id: this._id ,email:this.email
        }, process.env.Secret,{
            expiresIn:'24h'
        }
    
    )
    }
}

module.exports= mongoose.model("MY_SCHEMA", userschema)