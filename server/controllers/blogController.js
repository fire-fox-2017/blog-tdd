var mongo = require('mongodb')
var Blog = require('../models/blog')
var methods = {}

methods.insertOne = (req, res, next) => {
    let blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        email: req.body.email,
        blogURL: req.body.blogURL,
        content: req.body.content
    })
    blog.save(function(err, record) {
        if (err) return console.error(err);
        res.json(record)
    });
} // insertOne

methods.getAll = (req, res, next) => {
    Blog.find()
        .then(records => {
            res.json(records)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getAll Blog'
            })
        })
} //getAll

methods.getById = (req, res, next) => {
    Blog.findById(req.params.id)
        .then(record => {
            res.json(record)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getById Blog'
            })
        })
} // getById

methods.updateById = (req, res, next) => {
    Blog.findById(req.params.id)
        .then(record => {
            Blog.updateOne({
                    "_id": new mongo.ObjectID(req.params.id)
                }, {
                    $set: {
                        "author": req.body.author || record.author,
                        "title": req.body.title || record.title,
                        "email": req.body.email || record.email,
                        "blogURL": req.body.blogURL || record.blogURL,
                        "content": req.body.content || record.content,
                    }
                })
                .then((record) => {
                    console.log(typeof record);
                    res.json(record)
                })
                .catch(err => {
                    res.json({
                        err,
                        message: 'Error waktu update Blog'
                    })
                })
        })
        .catch(err => {
            res.json({
                err,
                message: 'Data tidak ada'
            })
        })
} //updateById

methods.deleteById = (req, res, next) => {
    Blog.deleteOne({
            "_id": new mongo.ObjectID(req.params.id)
        })
        .then((record) => {
            res.json(record)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu deleteById Blog'
            })
        })
} // deleteById

module.exports = methods