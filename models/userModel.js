const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const { password } = this.getUpdate();
  if (!password) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    this.getUpdate().password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});


module.exports = mongoose.model('User', userSchema);