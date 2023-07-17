const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
    },
    email: {
      type: String,
      required: [true, "user email required"],
      lowercase: true,
      unique: [true, "user email must be unique"],
    },
    password: {
      type: String,
      required: [true, "user password required"],
      minLength: [6, "The password must be at least 6 characters in length"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default:"user"
    },
    
  },
  { timestamps: true }
);


module.exports = mongoose.model('User', userSchema);