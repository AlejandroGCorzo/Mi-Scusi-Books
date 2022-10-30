import validations from "./validations.js";

export default function handleTextChange(
  e,
  changes,
  setChanges,
  errors,
  setErrors
) {
  if (e.target.name === "firstName" || e.target.name === "lastName") {
    setChanges({ ...changes, [e.target.name]: e.target.value.toLowerCase() });
    validations(e.target.name, e.target.value.toLowerCase(), errors, setErrors);
    return;
  }
  if (e.target.name === "dni") {
    let dni = e.target.value;
    if (changes.dni && changes.dni.length > e.target.value.length) {
      if (e.target.value.length === 10)
        dni = `${e.target.value.slice(0, 2).replace(".", "")}.${e.target.value
          .slice(2, 6)
          .replace(".", "")}.${e.target.value.slice(6).replace(".", "")}`;
      if (e.target.value.length === 9)
        dni = `${e.target.value.slice(0, 1).replace(".", "")}.${e.target.value
          .slice(1, 5)
          .replace(".", "")}.${e.target.value.slice(5).replace(".", "")}`;
      if (e.target.value.length === 8)
        dni = `${e.target.value.slice(0, 4).replace(".", "")}.${e.target.value
          .slice(4)
          .replace(".", "")}`;
      if (e.target.value.length === 6)
        dni = `${e.target.value.slice(0, 2).replace(".", "")}.${e.target.value
          .slice(2)
          .replace(".", "")}`;
      if (e.target.value.length === 5)
        dni = `${e.target.value.slice(0, 1).replace(".", "")}.${e.target.value
          .slice(1)
          .replace(".", "")}`;
      if (e.target.value.length === 4)
        dni = `${e.target.value.replace(".", "")}`;
    } else {
      if (e.target.value.length === 4)
        dni = `${e.target.value[0]}.${e.target.value.slice(1, 4)}`;
      else if (e.target.value.length === 6)
        dni = `${e.target.value
          .slice(0, 3)
          .replace(".", "")}.${e.target.value.slice(3)}`;
      else if (e.target.value.length === 7)
        dni = `${e.target.value
          .slice(0, 4)
          .replace(".", "")}.${e.target.value.slice(4)}`;
      else if (e.target.value.length === 8)
        dni = `${e.target.value[0]}.${e.target.value
          .slice(1, 5)
          .replace(".", "")}.${e.target.value.slice(5)}`;
      else if (e.target.value.length === 10)
        dni = `${e.target.value.slice(0, 3).replace(".", "")}.${e.target.value
          .slice(3, 7)
          .replace(".", "")}.${e.target.value.slice(7)}`;
      else if (e.target.value.length === 11)
        dni = `${e.target.value.slice(0, 4).replace(".", "")}.${e.target.value
          .slice(4, 8)
          .replace(".", "")}.${e.target.value.slice(8)}`;
    }
    setChanges({ ...changes, [e.target.name]: dni });
    validations(e.target.name, dni, errors, setErrors);
    return;
  }
  if (e.target.name === "phone") {
    let phone =
      e.target.value.length === 1 && e.target.value !== "+"
        ? `+${e.target.value}`
        : e.target.value;
    setChanges({ ...changes, [e.target.name]: phone });
    delete errors.phone;
    setErrors({ ...errors });
    return;
  }
  setChanges({ ...changes, [e.target.name]: e.target.value });
  validations(e.target.name, e.target.value, errors, setErrors);
}
