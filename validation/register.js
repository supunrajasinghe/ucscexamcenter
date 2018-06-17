const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.indexNo = !isEmpty(data.indexNo) ? data.indexNo : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.indexNo, { min: 8, max: 8 })) {
    errors.indexNo = "index number must be 8 characters";
  }

  if (validator.isEmpty(data.indexNo)) {
    errors.indexNo = "Index no field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "this is not valid email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "passsword field is required";
  }

  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "passsword between 5 - 30 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm passsword field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
