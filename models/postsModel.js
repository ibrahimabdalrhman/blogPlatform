const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    // user: {
    //   type:mongooose.Schema.ObjectId
    // },
    image: String,
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postsSchema);