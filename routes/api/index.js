const router = require("express").Router();
const userRoutes = require("./users");
const loginRoutes = require("./login")
const postsRoutes = require('./posts')
const postRoutes = require('./post')
// User routes
router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/posts", postsRoutes);
router.use("/post", postRoutes);

module.exports = router;
