// const router = require("express").Router();
// const userController = require("../../controllers/userController");


const express = require('express');
const router = express.Router();
const userController = require("../../controllers/userController")
//use Multer
const uploadMulter = require('../../client/src/utils/middleWare/upload.js')
//use Validation
const validation = require('../../client/src/utils/middleWare/validation.js')

//controllers
const { create, update, findById, createDefault } = require('../../controllers/userController.js');


router.post('/',uploadMulter, validation, create);
router.post('/default', createDefault);
router.put('/:id', uploadMulter, validation, update)
router.get('/:id', findById)
// router.delete('/:id', postsController.remove)

module.exports = router;
