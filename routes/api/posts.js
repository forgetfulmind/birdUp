const express = require('express');
const postsController = require("../../controllers/postsController")
const router = express.Router();
//use Multer
const uploadMulter = require('../../client/src/utils/middleWare/upload.js')
//use Validation
const validation = require('../../client/src/utils/middleWare/validation.js')

//controllers
const { create } = require('../../controllers/postsController.js');


router.post('/',uploadMulter, validation, create);
router.get('/', postsController.findAll)
router.get('/:id', postsController.findById)
router.delete('/:id', postsController.remove)

module.exports = router;