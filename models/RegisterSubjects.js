const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterSubjectSchema = new Schema({
  indexNo: {
    type: String,
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = AddSubject = mongoose.model(
  "registerSubjects",
  RegisterSubjectSchema
);
