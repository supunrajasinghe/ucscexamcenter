const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.indexNo = !isEmpty(data.indexNo) ? data.indexNo : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.indexNo)) {
    errors.indexNo = "Index no field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "passsword field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
