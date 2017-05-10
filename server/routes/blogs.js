const express = require('express');
var router = express.Router();
var controller = require('../controllers/blogController')

router.get('/', controller.getBlogs);
router.get('/:id', controller.getOneBlog);
router.post('/', controller.addBlog);
router.put('/:id', controller.updateBlog);
router.delete('/:id', controller.deleteBlog);

module.exports = router;