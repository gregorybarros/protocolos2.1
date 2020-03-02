const mongoose = require("../databases")
const Schema = mongoose.Schema

const {format} = require('date-fns')
const pt = require('date-fns/locale/pt-BR')

const mongoosePaginate = require("mongoose-paginate")
const AutoIncrement = require('mongoose-sequence')(mongoose)


const Protocol = new Schema({


    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    date: {
        type: String,

        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        
    },

})

Protocol.plugin(AutoIncrement, {inc_field: 'num'})
Protocol.plugin(mongoosePaginate)

module.exports = mongoose.model('protocols', Protocol)