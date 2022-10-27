export default function validations(name, value, errors, setErrors) {
  if (name === "firstName" || name === "lastName") {
    if (!/^([a-z]+\s)*[a-z]+$/.test(value))
      return setErrors({
        ...errors,
        [name]:
          "Name must be only words withouth numbers and only one whitespace between them.",
      });
    else {
      delete errors[name];
      return setErrors({ ...errors });
    }
  }
  if (name === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+[^\.]$/.test(value))
      return setErrors({ ...errors, [name]: "Must be a valid Email." });
    else {
      delete errors[name];
      return setErrors({ ...errors });
    }
  }
  if (name === "dni") {
    if (!/^[\d]{1,3}\.[\d]{3,3}\.[\d]{3,3}$/.test(value))
      return setErrors({ ...errors, [name]: "Must be a valid DNI, use dots." });
    else {
      delete errors[name];
      return setErrors({ ...errors });
    }
  }
  // if (name === "phone") {
  //   if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value))
  //     return setErrors({ ...errors, [name]: "Must be a valid phone number." });
  //   else {
  //     delete errors[name];
  //     return setErrors({ ...errors });
  //   }
  // }
}
