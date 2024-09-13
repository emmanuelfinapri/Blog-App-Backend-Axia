const express = require("express");
const {
  makePost,
  getAllPost,
  getSinglePost,
  likePost,
} = require("../controllers/post"); // Import controller functions
const routes = express.Router(); // Create an instance of the router

// Route to create a new post
routes.post("/post", makePost);

// Route to get all posts
routes.get("/post", getAllPost);

// Route to get a single post by ID
routes.get("/post/:id", getSinglePost);

// Route to like or dislike a post
routes.post("/post/like", likePost);

// Export the router to be used in other parts of the application
module.exports = routes;
