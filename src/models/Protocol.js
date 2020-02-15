const mongoose = require("../databases")
const Schema = mongoose.Schema

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
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('protocols', Protocol)