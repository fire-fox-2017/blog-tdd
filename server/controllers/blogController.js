var Blog = require('../models/blog');

getBlogs = (req, res)=>{
  Blog.find().then((blogs)=>{
    res.send(blogs)
  })
}

getOneBlog = (req, res)=>{
  Blog.findById(req.params.id, function(err,blog){
    if (err) res.send(err)
    res.send(blog)
  })
}

addBlog = (req, res)=>{
  if (req.body.title.length < 6){
    res.send({
      msg: 'Title should have at least 6 characters'
    })
    return
  }
  var blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    createdAt: new Date()
  })
  blog.save((err,blog)=>{
    if (err) res.send(err)
    res.send(blog)
  })
}

updateBlog = (req, res)=>{
  Blog.findById(req.params.id, function(err,blog){
    if (err) res.send(err)
    if (req.body.title===undefined){
      blog.title = blog.title
    }
    else if (req.body.title.length < 6){
      res.send({
        msg: 'Title should have at least 6 characters'
      })
      return
    }
    else {
      blog.title = req.body.title;
    }
    blog.author= req.body.author || blog.author;
    blog.content= req.body.content || blog.content;
    blog.createdAt= req.body.createdAt || Date(blog.createdAt);
    blog.save((err,blog)=>{
      if (err) res.send(err)
      res.send(blog)
    })
  })
}

deleteBlog= (req, res)=>{
  Blog.remove({_id:req.params.id}, (err, blog)=>{
    if (err) res.send(err)
    res.send(blog);
  })
}

module.exports = {getBlogs, getOneBlog, addBlog, updateBlog, deleteBlog}