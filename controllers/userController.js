const db = require("../models");

// Defining methods for the userController
module.exports = {
  create: function(req, res) {
    console.log("create userController")
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
};
