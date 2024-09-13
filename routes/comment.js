const express = require("express");
const { makeComment, getAllComments } = require("../controllers/comment"); // Import controller functions

const routes = express.Router(); // Create an instance of the router

// Route to create a new comment
routes.post("/comment", makeComment);

// Route to get all comments
routes.get("/comment", getAllComments);

// Export the router to be used in other parts of the application
module.exports = routes;
