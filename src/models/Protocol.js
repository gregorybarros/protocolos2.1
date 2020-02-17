const mongoose = require("../databases")
const Schema = mongoose.Schema
const {format} = require('date-fns')
const pt = require('date-fns/locale/pt-BR')

const Protocol = new Schema({
    title: {
        type: String,
        required: true
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
    createdAt: {
        type: String,
        default: format(new Date(), "dd/MM/yy 'às' HH:mm", { timeZone:'America/Sao_Paulo', locale:pt }),
        
    },
})

module.exports = mongoose.model('protocols', Protocol)