const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    role: { type: String, required: true, default: "user" },
    salt: Buffer,
  },
  { timestamps: true }
);


exports.User = mongoose.model("User", userSchema);
