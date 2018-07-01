const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddSubjectStudentSchema = new Schema({
  indexNO: {},
  degree: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true
  },
  subjectName: {
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

module.exports = AddSubjectStudent = mongoose.model(
  "registerSubjects",
  AddSubjectStudentSchema
);
