const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");


exports.deleteOne = (Model) =>
  
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: true,
      msg: " deleted",
      post: doc,
    });
  });


exports.getOne = (Model) => 
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
     if (!document) {
       return next(
         new ApiError(`No document for this id ${req.params.id}`, 404)
       );
     }
    res.status(200).json({
      status: true,
      post: doc,
    });
  });


exports.updateOne = (Model) => 
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
     if (!document) {
       return next(
         new ApiError(`No document for this id ${req.params.id}`, 404)
       );
     }

    res.status(201).json({
      status: true,
      post: post,
    });
  });


exports.createOne = (Model) => 
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: true,
      post: doc,
    });
  });



exports.getAll = (Model) => 
  asyncHandler(async (req, res, next) => {
    const doc = await Model.find();
    res.status(200).json({
      status: true,
      post: doc,
    });
  });


