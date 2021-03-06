const mongoose= require('mongoose')
const Schema=mongoose.Schema

const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
     },
    contact:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true
    } 
})

const Users = mongoose.model('users', userSchema);

module.exports = Users