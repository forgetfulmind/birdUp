const path = require("path");
const express = require('express');
const router = require("express").Router();
const ApiRoutes = require("./api");

// API Routes
router.use("/api", ApiRoutes);

// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });



module.exports = router;
