const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();
var server = require ('../app');
var Blog = require('../models/blog')

describe('Blog', () => {
  var id=""
  beforeEach((done)=>{
    var blog = new Blog({
      title: 'Lorem Ipsum',
      author: 'Bobby',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend, nibh ut pulvinar dignissim, orci massa eleifend mi, non porta mi tortor egestas enim.',
      createdAt: new Date()
    })
    
    blog.save((err,blog)=>{
      id = blog._id
      done()
    })
  });
  
  afterEach((done)=>{
    Blog.remove({}, (err)=>{
      done()
    })
  })
  
  describe('GET - all blogs', ()=>{
    it('should get all blogs', (done)=>{
      chai.request(server)
      .get('/blogs')
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.equal(1)
        done()
      })
    })
  })
  
  describe('GET - one blog', ()=>{
    it('should get one blog', (done)=>{
      chai.request(server)
      .get('/blogs/' + id)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('title')
        res.body.should.have.property('author')
        res.body.should.have.property('content')
        res.body.should.have.property('createdAt')
        res.body.title.should.equal('Lorem Ipsum')
        res.body.author.should.equal('Bobby')
        res.body.content.should.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend, nibh ut pulvinar dignissim, orci massa eleifend mi, non porta mi tortor egestas enim.')
        done()
      })
    })
  })
  
  describe('POST - create blog', ()=>{
    it('should create a blog', (done)=>{
      chai.request(server)
      .post('/blogs')
      .send({
        title: 'Lorem Ipsum',
        author: 'Andy',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend, nibh ut pulvinar dignissim, orci massa eleifend mi, non porta mi tortor egestas enim.',
        createdAt: new Date()
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('title')
        res.body.should.have.property('author')
        res.body.should.have.property('content')
        res.body.should.have.property('createdAt')
        res.body.title.should.equal('Lorem Ipsum')
        res.body.author.should.equal('Andy')
        res.body.content.should.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend, nibh ut pulvinar dignissim, orci massa eleifend mi, non porta mi tortor egestas enim.')
        done()
      })
    })
  })
  
  describe('POST - create blog with title shorter than 6 characters', ()=>{
    it('should return msg', (done)=>{
      chai.request(server)
      .post('/blogs')
      .send({
        title: 'Lorem',
        author: 'Andy',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend, nibh ut pulvinar dignissim, orci massa eleifend mi, non porta mi tortor egestas enim.',
        createdAt: new Date()
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('msg')
        res.body.msg.should.equal('Title should have at least 6 characters')
        done()
      })
    })
  })
  
  describe('PUT - update a blog', ()=>{
    it('should update a blog', (done)=>{
      chai.request(server)
      .put('/blogs/' + id)
      .send({
        author: 'Catur'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('title')
        res.body.should.have.property('author')
        res.body.should.have.property('content')
        res.body.should.have.property('createdAt')
        res.body.title.should.equal('Lorem Ipsum')
        res.body.author.should.equal('Catur')
        res.body.content.should.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend, nibh ut pulvinar dignissim, orci massa eleifend mi, non porta mi tortor egestas enim.')
        done()
      })
    })
  })
  
  describe('PUT - update a blog with title less than 6 characters', ()=>{
    it('should return msg', (done)=>{
      chai.request(server)
      .put('/blogs/' + id)
      .send({
        title: 'Lorem'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('msg')
        res.body.msg.should.equal('Title should have at least 6 characters')
        done()
      })
    })
  })
  
  describe('DELETE - a blog', ()=>{
    it('should delete a blog', (done)=>{
      chai.request(server)
      .delete('/blogs/' + id)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('ok')
        res.body.should.have.property('n')
        res.body.n.should.equal(1)
        done()
      })
    })
  })
  
  
  
})