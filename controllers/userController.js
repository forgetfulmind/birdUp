const db = require("../models");

// Defining methods for the userController
module.exports = {
//   create: function(req, res) {
//     console.log("create userController")
//     db.User
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err.message));
//   }

create: function(req, res) {
    console.log(req)
    let username = req.body.username;
    let profileimage = req.body.image;
    let userId = req.body.userId;
    
    //sets what to save
    const user ={
        username: username,
        profileimage: profileimage,
        userId: userId
              
    }
    console.log('create post')
    db.User
    .create(user)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err.message));
},
createDefault: function(req, res) {
    console.log(req)
    let username = req.body.username;
    let profileimage = req.body.image
    let userId = req.body.userId;
    
    //sets what to save
    const user ={
        username: username,
        profileimage: profileimage,
        userId: userId
              
    }
    console.log('create default user')
    console.log(user, 'default user')
    db.User
    .create(user)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err.message));
},
findById: function(req, res) { //finds by USER ID, not post ID
    db.User
      .find({userId: req.params.id})
    //   .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
},
update: function(req, res) {
    let username = req.body.username;
    let profileimage = req.body.image;
    let userId = req.body.userId;
    //set whats to change
    const user ={
        username: username,
        profileimage: profileimage,
        userId: userId   
    }
    console.log(user, req.params.id, "update function")
    db.User
        .findOneAndUpdate({ userId: req.params.id }, user)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
}
};
