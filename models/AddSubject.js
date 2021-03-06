const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddSubjectSchema = new Schema({
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
    default: "0"
  }
});

module.exports = AddSubject = mongoose.model("subjects", AddSubjectSchema);
