const Post = require('../models/postsModel');
const Factory = require('./handlersFactory');
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");


exports.createPost = Factory.createOne(Post);

exports.getPosts = Factory.getAll(Post);

exports.getPostById = Factory.getOne(Post);

exports.updatePost = Factory.updateOne(Post);

exports.deletePost = Factory.deleteOne(Post);


exports.addlike = asyncHandler(async (req, res, next) => {
  
  let post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user._id.toString())) {

    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    )

  }
  else {
    
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
  }

  res.status(200).json({
    status: "true",
    message: "liked",
    data: post.likes,
  });

});


exports.addcomment = asyncHandler(async (req, res, next) => {

  
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: { user: req.user._id, comment: req.body.comment } },
    },
    { new: true }
  )

  res.status(200).json({
    status: "true",
    message: "added comment successfully",
    data: post.comments,
  });

});


exports.getLikes = asyncHandler(async (req, res, next) => {

  const post = await Post.findById(req.params.id).populate({ path: "likes", select: "name image" });
  

  res.status(200).json({
    status: "true",
    data: post.likes,
  });
});


exports.getComments = asyncHandler(async (req, res, next) => {

  const post = await Post.findById(req.params.id).populate({ path: "comments.user", select: "name image" });
  
  res.status(200).json({
    status: "true",
    data: post.comments,
  });
});
