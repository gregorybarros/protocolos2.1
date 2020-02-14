const mongoose = require("../databases")
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const Usuario = new Schema ({
    nome:{
        type:String,
        required: true,
    },
    sobrenome:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    cidade:{
        type:String,
        required:true,
    },
    estado:{
        type:String,
        required:true,
    },
    cep:{
        type:String,
        required:true,
    },
    endereco:{
        type:String,
        required:true,
    },
    senha:{
        type:String,
        select: false,
        required:true,
    },
    dataNas:{
        type:String,
        required:true,
    },
    dataAdm:{
        type:String,
        required:true,
    },
    sexo:{
        type:String,
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

})

Usuario.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash

    next()
})
    
module.exports = mongoose.model("usuarios", Usuario)
    