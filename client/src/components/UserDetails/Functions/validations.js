export default function validations(name, value, errors, setErrors) {
  if (name === "firstName" || name === "lastName") {
    if (!/^([a-zñ]+\s)*[a-zñ]+$/.test(value))
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

  if (name === "dni") {
    if (!/^[\d]{1,3}\.[\d]{3,3}\.[\d]{3,3}$/.test(value))
      return setErrors({ ...errors, [name]: "Must be a valid DNI, use dots." });
    else {
      delete errors[name];
      return setErrors({ ...errors });
    }
  }

  if (name === "birthdate") {
    const actualYear = new Date().getFullYear();
    const year = new Date(value).getFullYear();

    if (year > actualYear || year < 1900) {
      return setErrors({ ...errors, [name]: "Must be a valid year" });
    } else {
      delete errors[name];
      return setErrors({ ...errors });
    }
  }
}
