const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilePic: { type: String, default: "" },
  bio: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isLive: { type: Boolean, default: false },
  streamKey: { type: String, unique: true, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  scheduledStreams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stream" }],
  pastStreams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stream" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
