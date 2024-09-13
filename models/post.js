const mongoose = require("mongoose");

// create a new schema object
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    previewPics: {
      type: String,
      required: true,
    },
    detailPics: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    like: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Comment",
    },
  },
  { timestamps: true }
);
// create post's model and export
const postModel = mongoose.model("Posts", postSchema);
module.exports = postModel;
