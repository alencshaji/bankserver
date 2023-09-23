// create model

// import mongooswe
const mongoose = require('mongoose')

// define schema-fields and values of model of model  (structure)
const usersSchema = new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
    
})
//  model-collection name
const users = new mongoose.model("users",usersSchema)
/// export
module.exports =users