// // // // VALIDACIÓN DE ERRORES // // // //
export default function validations({
  name,
  value,
  errors,
  setErrors,
  password,
  confirmPass,
}) {
  if (name === "name" || name === "lastName") {
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

  if (name === "password" || name === "confirmPass") {
    if (name === "password") {
      if (!/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)[a-zA-ZñÑ\d]{8,}$/.test(password))
        return setErrors({
          ...errors,
          [name]:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
          confirmPass: "Passwords must be the same.",
        });
      else delete errors[name];

      if (password !== confirmPass)
        return setErrors({
          ...errors,
          [name]: "Passwords must be the same.",
          confirmPass: "Passwords must be the same.",
        });
      else delete errors.confirmPass;

      return setErrors({ ...errors });
    }

    if (name === "confirmPass") {
      if (password !== confirmPass)
        return setErrors({
          ...errors,
          [name]: "Passwords must be the same.",
          password: "Passwords must be the same.",
        });
      else delete errors[name];
      if (
        !/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)[a-zA-ZñÑ\d]{8,}$/.test(confirmPass)
      )
        return setErrors({
          ...errors,
          password:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
        });
      else delete errors.password;

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
