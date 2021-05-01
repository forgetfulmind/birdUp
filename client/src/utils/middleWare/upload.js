const multer = require('multer')
const path = require('path')

//first set storage => file names and destination
// const storage = multer.diskStorage({
//     //first our destination
//     destination: function(req, res, cb) {
//         cb(null, path.join(__dirname, './uploads/'))
//     },
//     filename: function(req, file, cb) {
//         console.log(file)
//         //generate unique name for each image
//         cb(null, 'Joshua' + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../../../public/Images'));
    },
    filename: function(req, file, cb){ 
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname); 
    }
  });

//file filter we accept any file
const filerFilter = (req, file, cb) => {
    cb(null, true)
}

let upload = multer({
    storage: storage,
    fileFilter: filerFilter
})

//export upload as single file
module.exports = upload.single('postsImage');