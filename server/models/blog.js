const mongoose = require('mongoose')
let Schema = mongoose.Schema

let blogSchema = new Schema({
    author: {
        type: String,
        required: true,
        minLength: 6
    },
    title: {
        type: String,
        required: true
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
        required: true,
        maxLength: 500
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