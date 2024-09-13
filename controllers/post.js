// Importing the required model
const postModel = require("../models/post");

// Function to create a new post
const makePost = async (req, res) => {
  const body = req.body; // Extract the request body
  const newPost = new postModel(body); // Create a new post instance

  try {
    // Save the new post to the database
    await newPost.save();
    // Send a success response
    res.json({ message: "Post created successfully" });
  } catch (error) {
    // Send an error response if there's an exception
    res.json({ message: error.message });
  }
};

// Function to get all posts
const getAllPost = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const allPost = await postModel
      .find()
      .populate({ path: "comments", select: "comment postId commentorsId" });
    // Send a response with all posts
    res.json(allPost);
  } catch (error) {
    // Send an error response if there's an exception
    res.json({ message: error.message });
  }
};

const allComments = await commentModel
  .find()
  .populate({ path: "postId", select: "title desc" })
  .populate({ path: "commentorsId", select: "username email" });
res.json(allComments);

// Function to get a single post by ID
const getSinglePost = async (req, res) => {
  const { id } = req.params; // Extract the post ID from the request parameters

  try {
    // Retrieve a single post by its ID
    const singlePost = await postModel
      .findById(id)
      .populate({ path: "comments", select: "comment postId commentorsId" });
    // Send a response with the post
    res.json(singlePost);
  } catch (error) {
    // Send an error response if there's an exception
    res.json({ message: error.message });
  }
};

// Function to like or dislike a post
const likePost = async (req, res) => {
  const { id, userId } = req.body; // Extract post ID and user ID from the request body
  const thePost = await postModel.findById(id); // Retrieve the post by its ID

  // Check if the post exists
  if (!thePost) {
    return res.json({ message: "This post does not exist" });
  }

  // Array to hold all likes
  const gottenLikes = thePost.like;

  // Check if the user has already liked the post
  const checkUserInArray = gottenLikes.includes(userId);

  if (!checkUserInArray) {
    // Add the user to the likes array if they haven't liked the post
    gottenLikes.push(userId);
    res.json({ message: `You have liked this post` });
  } else {
    // Remove the user from the likes array if they have already liked the post
    const getIndex = gottenLikes.indexOf(userId);
    gottenLikes.splice(getIndex, 1);
    res.json({ message: `You have disliked this post` });
  }

  // Update the likes in the database
  try {
    await postModel.findByIdAndUpdate(id, { like: gottenLikes }, { new: true });
  } catch (error) {
    // Send an error response if there's an exception
    res.json({ message: error.message });
  }
};

// Export all functions for use in other parts of the application
module.exports = {
  makePost,
  getAllPost,
  getSinglePost,
  likePost,
};
