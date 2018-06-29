const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddSubjects(data) {
  let errors = {};

  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.semester = !isEmpty(data.semester) ? data.semester : "";
  data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : "";
  data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : "";

  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }
  if (validator.isEmpty(data.year)) {
    errors.year = "year field is required";
  }
  if (validator.isEmpty(data.semester)) {
    errors.semester = "semester field is required";
  }
  if (validator.isEmpty(data.subjectCode)) {
    errors.subjectCode = "subject code field is required";
  }
  if (validator.isEmpty(data.subjectName)) {
    errors.subjectName = "subject name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
