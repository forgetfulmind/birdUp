const express = require('express');
const postsController = require("../../controllers/postsController")
const router = express.Router();





router.get('/:id', postsController.findPost)


module.exports = router;