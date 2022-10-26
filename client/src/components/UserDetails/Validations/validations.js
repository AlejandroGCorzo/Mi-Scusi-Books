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
      return setErrors({
        ...errors,
        [name]: "Must be a valid Email.",
      });
    else {
      delete errors[name];
      return setErrors({ ...errors });
    }
  }
}
