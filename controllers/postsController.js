const db = require('../models')
const posts = require('../models/posts')


module.exports = {
    create: function(req, res) {
        // console.log(req)
        let username = req.body.username;
        let userId = req.body.userId
        let image = req.body.image
        let lat = req.body.lat;
        let lng = req.body.lng;
        let comment = req.body.comment;

    const posts ={
        username: username,
        userId: userId,
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
          .find({userId: req.params.id})
          .sort({ createdAt: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findPost: function(req, res) { //finds by Post ID
        db.Posts
          .findById(req.params.id)
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