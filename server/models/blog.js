const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  content: String,
  createdAt: Date
});

module.exports = mongoose.model('Blog', blogSchema);