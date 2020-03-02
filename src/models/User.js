const mongoose = require("../databases")
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const User = new Schema ({
    
    name:{
        type:String,
        required: true,
    },
    secondName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    phone:{
        type:String,
        required:true,
    },
    office:{
        type:String,
        required:true,
    },
    dateBirth:{
        type:Date,
        required:true,
    },
    dateAdm:{
        type:Date,
        required:true,
    },
    zip:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    adress:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        select: false,
        required:true,
    },
    eAdmin:{
        type:Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalProt:{
        type:Number,
        default: 0,
    },
    phrase:{
        type:String,
        default: "",

    }

})

User.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})
    
module.exports = mongoose.model("users", User)
    