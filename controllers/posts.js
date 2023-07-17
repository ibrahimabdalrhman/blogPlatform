const Post = require('../models/postsModel');

exports.createPost = async (req, res, next) => {

  const post = await Post.create(req.body);
  res.status(201).json({
    status: true,
    msg: "you create a new post ",
    post: post
  });
};

exports.getPosts = async (req, res, next) => {

  const post = await Post.find();
  res.status(200).json({
    status: true,
    post: post
  });
};

exports.getPostById = async (req, res, next) => {

  const post = await Post.findById(req.params.id);
  res.status(200).json({
    status: true,
    post: post
  });
};

exports.updatePost = async (req, res, next) => {

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  );

  res.status(201).json({
    status: true,
    msg: "post updated ",
    post: post,
  });
};

exports.deletePost = async (req, res, next) => {

  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: true,
    msg: "post deleted",
    post: post,
  });
};