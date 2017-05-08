var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
var server = require('../server')
var Blog = require('../models/blog')

describe('blog', () => {
    var id = ''
    beforeEach(done => {
        var newBlog = new Blog({
            "author": "Uci",
            "email": "uci@gmail.com",
            "blogURL": "www.shine.com",
            "content": "ecommmerce jual beli baju kebaya"
        })

        newBlog.save((err, blog) => {
            id = blog._id
            done()
        })
    })

    afterEach(done => {
        Blog.remove({}, (err) => {
            done()
        })
    })

    describe('GET - all blog', () => {
        it('should get all blog', (done) => {
            chai.request(server)
                .get('/api/blogs')
                .end((err, res) => {
                    // console.log('-----------------', res);
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.equal(1)

                    done()
                })
        })
    })

    describe('POST - create blog', () => {
        it('should add a blog', (done) => {
            chai.request(server)
                .post('/api/blogs')
                .send({
                    author: "Butet",
                    email: "butet@gmail.com",
                    blogURL: "www.butet.com",
                    content: "jobstreet"
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('author')
                    res.body.should.have.property('email')
                    res.body.should.have.property('blogURL')
                    res.body.should.have.property('content')

                    res.body.author.should.equal('Butet')
                    res.body.email.should.equal('butet@gmail.com')
                    res.body.blogURL.should.equal('www.butet.com')
                    res.body.content.should.equal('jobstreet')

                    done()
                })
        })
    })

    describe('PUT - update blog', () => {
        it('should update a blog', (done) => {
            chai.request(server)
                .put(`/api/blog/${id}`)
                .send({
                    "author": "Siapa",
                    "email": "siapa@gmail.com",
                    "blogURL": "www.siapa.com",
                    "content": "siapa EGP"
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.should.have.property('nModified')
                    res.body.should.have.property('n')

                    res.body.ok.should.equal(1)
                    res.body.nModified.should.equal(1)
                    res.body.n.should.equal(1)

                    done()
                })
        })
    })

    describe('DELETE - delete blog', () => {
        it('should delete a blog', (done) => {
            chai.request(server)
                .delete(`/api/blog/${id}`)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.should.have.property('n')

                    res.body.ok.should.equal(1)
                    res.body.n.should.equal(1)

                    done()
                })
        })
    })
})