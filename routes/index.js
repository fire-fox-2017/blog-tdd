'use strict';
const router = require('express').Router()
const blogController = require('../controllers/blogController')

// NOTE: BLOG
router.post('/api/blogs', blogController.insertOne)
router.put('/api/blog/:id', blogController.updateById)
router.get('/api/blog/:id', blogController.getById)
router.get('/api/blogs', blogController.getAll)
router.delete('/api/blog/:id', blogController.deleteById)

module.exports = router