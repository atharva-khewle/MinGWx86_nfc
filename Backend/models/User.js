import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bycrpt from "bcrypt"

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

//we encrypt the password just before we save data
userSchema.pre("save" , async function (next) {
  // next() is used to exit and go to the next step (its kinda like continue (but not exactly))
  //only encrypt password when password is modified (isModified is inbuilt function to check modification)
  if(!this.isModified("password")) {
      return next()
  }
  this.password = await bycrpt.hash(this.password, 10)
  next()
})

//use this to check password correctness
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bycrpt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function() {
  return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

userSchema.methods.generateRefreshToken =  function() {
  return jwt.sign({
      _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
}

const User = mongoose.model("User", userSchema)

export {User};