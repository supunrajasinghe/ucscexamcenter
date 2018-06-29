const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  degree: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  examination: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  addDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: true
  }
});

module.exports = Exam = mongoose.model("exam", ExamSchema);
