const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterSubjects(data) {
  let errors = {};

  data.indexNo = !isEmpty(data.indexNo) ? data.indexNo : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.subjects = !isEmpty(data.subjects) ? data.subjects : "";
  data.type = !isEmpty(data.type) ? data.type : "";

  if (validator.isEmpty(data.indexNo)) {
    errors.indexNo = "indexNo field is required";
  }
  if (validator.isEmpty(data.dehree)) {
    errors.dehree = "dehree field is required";
  }
  if (isEmpty(data.subjects)) {
    errors.subjects = "subjects field is required";
  }
  if (validator.isEmpty(data.type)) {
    errors.type = "type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
