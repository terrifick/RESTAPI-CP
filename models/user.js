const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 0,
  },
  profession: {
    type: String,
    lowercase: true,
    enum: ["actor", "actress", "singer"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
