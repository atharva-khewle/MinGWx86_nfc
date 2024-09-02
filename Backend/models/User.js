import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Changed from 'bcrypt' to 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  interest: {
    type: Array,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pfp: {
    type: String
  },
  gamesComingUp: {
    type: Array
  },
  recentMatches: {
    type: Array
  },
  recentGames: {
    type: Array
  },
  userStats: {
    type: Array,
    default: []
  },
  friends: {
    type: Array,
    default: []
  }
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); // Use bcryptjs for hashing
  next();
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password); // Use bcryptjs for comparison
};

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  });
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
};

const User = mongoose.model("User", userSchema);

export { User };
