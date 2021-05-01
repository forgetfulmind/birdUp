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
    },
    findAll: function(req, res) {
        db.Posts
          .find(req.query)
          .sort({ createdAt: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) { //finds by USER ID, not post ID
        db.Posts
          .find({name: req.params.id})
          .sort({ createdAt: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Posts
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}