// // // // VALIDACIÓN DE ERRORES // // // //
export default function validations(
  name,
  value,
  user,
  errors,
  setErrors,
  confirmPass
) {
  if (name === "name" || name === "lastName") {
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

  // if (name === "username") {
  //   if (!/^[a-zA-Z0-9]*$/.test(value))
  //     return setErrors({
  //       ...errors,
  //       [name]:
  //         "Username must be only one word, numbers allowed, no whitespaces allowed.",
  //     });
  //   else {
  //     delete errors[name];
  //     return setErrors({ ...errors });
  //   }
  // }
  if (name === "password" || name === "confirmPass") {
    if (name === "password") {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value))
        return setErrors({
          ...errors,
          [name]:
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
          confirmPass: "Passwords must be the same.",
        });
      else {
        if (user.password !== confirmPass)
          return setErrors({
            ...errors,
            [name]: "Passwords must be the same.",
            confirmPass: "Passwords must be the same.",
          });
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "confirmPass") {
      if (user.password !== value)
        return setErrors({
          ...errors,
          [name]: "Passwords must be the same.",
          password: "Passwords must be the same.",
        });
      else {
        delete errors[name];
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value))
          return setErrors({
            ...errors,
            password:
              "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, no whitespaces allowed.",
          });
        else {
          delete errors.password;
        }
        return setErrors({ ...errors });
      }
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
