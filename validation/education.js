const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};
  const toValidate = ["degree", "school", "fieldofstudy", "from"];
  toValidate.map((keys, index) => {
    data[keys] = !isEmpty(data[keys]) ? data[keys] : "";
  });

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }
  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
