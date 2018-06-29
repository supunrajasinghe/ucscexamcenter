const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExamInput(data) {
  let errors = {};

  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.semester = !isEmpty(data.semester) ? data.semester : "";
  data.examination = !isEmpty(data.examination) ? data.examination : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }
  if (validator.isEmpty(data.year)) {
    errors.year = "year field is required";
  }
  if (validator.isEmpty(data.semester)) {
    errors.semester = "semester field is required";
  }
  if (validator.isEmpty(data.examination)) {
    errors.examination = "examination field is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }
  if (isEmpty(data.deadline)) {
    errors.deadline = "deadline field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
