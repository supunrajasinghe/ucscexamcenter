const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.registrationNo = !isEmpty(data.registrationNo)
    ? data.registrationNo
    : "";
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.nameWithInitials = !isEmpty(data.nameWithInitials)
    ? data.nameWithInitials
    : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
  //data.fixedNo = !isEmpty(data.fixedNo) ? data.fixedNo : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (validator.isEmpty(data.registrationNo)) {
    errors.registrationNo = "Registration number is required";
  }

  if (validator.isEmpty(data.fullName)) {
    errors.fullName = "full name is required";
  }

  if (validator.isEmpty(data.nameWithInitials)) {
    errors.nameWithInitials = "name with initials is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree is required";
  }

  if (validator.isEmpty(data.year)) {
    errors.year = "year is required";
  }

  if (validator.isEmpty(data.mobileNo)) {
    errors.mobileNo = "mobile number is required";
  }

  // if (validator.isEmpty(data.fixedNo)) {
  //   errors.fixedNo = "fixed number is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
