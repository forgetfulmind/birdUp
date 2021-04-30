const fs = require('fs');

module.exports = (req, res, next) => {
    //first we will save category name and image
    if(typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        //if error
        return res.status(400).json({
            errors:'Problem with sending data'
        })
    }

    //get image and name 
    console.log(req.file);
    let name = req.body.name
    let image = req.file.path

    //check type of image(only png, jpg, jpeg)
    if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('jpg') && !(req.file.mimetype).includes('png')) {
        //remove file
        fs.unlinkSync(image);
        return res.status(400).json({
            errors:'File not supported.'
        })
    }

    //check the size of the file
    if(req.file.size > 1024 * 1024 * 4) {
        fs.unlinkSync(image);
        return res.status(400).json({
            errors:'File is to large.'
        })
    }

    //check if field is empty
    // if(!name || !image) {
    //     return res.status(400).json({
    //         errors:'All fields are required.'
    //     })
    // }


    next();
}