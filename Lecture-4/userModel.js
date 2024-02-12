const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 2,
  },
});

// const userModel = mongoose.model("user", userSchema);
// module.exports = userModel;

module.exports = mongoose.model("user", userSchema); //filename
