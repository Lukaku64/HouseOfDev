const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  salt: String,
  favourties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Estate" }],
  role: { type: String, enum: ["admin", "agente", "user"], default: "user" },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
