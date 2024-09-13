// Importing the required models
const commentModel = require("../models/comment");
const postModel = require("../models/post");

// Function to create a new comment
const makeComment = async (req, res) => {
  const { comment, postId } = req.body;
  const { id } = req.user;

  try {
    // first create the comment
    const newComment = new commentModel({ comment, commentorsId: id, postId });
    const savedComment = await newComment.save();
    // modify tthe post comments field
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: savedComment.id },
    });
    res.json({ message: "comment made successfully" });
  } catch (error) {
    // Log the error message if there's an exception
    console.log(error.message);
  }
};

const getAllComments = async (req, res) => {
  try {
    const allComments = await commentModel
      .find()
      .populate({ path: "postId", select: "title desc" })
      .populate({ path: "commentorsId", select: "username email" });
    res.json(allComments);
  } catch (error) {
    console.log(error.message);
  }
};

// Export the functions to be used in other parts of the application
module.exports = { makeComment, getAllComments };
