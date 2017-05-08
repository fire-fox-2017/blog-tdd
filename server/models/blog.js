const mongoose = require('mongoose')
let Schema = mongoose.Schema

let blogSchema = new Schema({
    author: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true
    },
    blogURL: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
}) // itemSchema

let Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog