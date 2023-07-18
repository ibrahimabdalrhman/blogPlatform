const jwt = require('jsonwebtoken');
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signup = asyncHandler(async (req, res, next) => {
  
  const user = await User.create(req.body);
  const token = createToken(user._id)
  res.status(201).json({
    status: true,
    user,
    token
  })
});

exports.login = asyncHandler(async (req, res, next) => {
  
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("incorrect email", 401));
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = createToken(user._id);
    return res.status(201).json({
      status: true,
      user,
      token,
    });
  }
  return next(new ApiError("incorrect password", 401));
  
});

//to check if user loggedin
exports.auth = asyncHandler(async (req, res, next) => {
  
  if (!req.headers.authorization) {
    return next(new ApiError("you must login to access this route ", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ApiError("you must login to access this route ", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Check whether the decoded userId is stored in the database.
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    req.user = currentUser;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    next(err);
  }
});

