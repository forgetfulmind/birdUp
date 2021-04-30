const db = require('../models')
const posts = require('../models/posts')


module.exports = {
    create: function(req, res) {
        console.log(req)
        let name = req.body.name;
        let image = req.file.path
        let lat = req.body.lat;
        let lng = req.body.lng;
        let comment = req.body.comment;

    const posts ={
        name: name,
        image: image,
        lat: lat,
        lng:lng,
        comment: comment       
    }
        console.log('create post')
        db.Posts
        .create(posts)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err.message));
    }
}