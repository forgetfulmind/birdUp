const express = require('express');
const router = express.Router();
//use Multer
const uploadMulter = require('../../client/src/utils/middleWare/upload.js')
//use Validation
const validation = require('../../client/src/utils/middleWare/validation.js')

//controllers
const { create } = require('../../controllers/postsController.js');


router.post('/',uploadMulter, validation, create);

module.exports = router;