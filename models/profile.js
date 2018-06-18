const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  registrationNo: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  nameWithInitials: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  fixedNo: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
