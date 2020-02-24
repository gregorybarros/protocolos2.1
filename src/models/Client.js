const mongoose = require("../databases")
const Schema = mongoose.Schema

const Client = new Schema({
    code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    resp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    since: {
        type: Date,
        required: true
    },
    obs: {
        type: String,
        required: false
    },
    soft: {
        type: Object,
        required: true
    },
    phone: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('clients', Client)