export default function handleErrors(e, errorHandler, setErrorHandler) {
  const onlyNumber = new RegExp(/^[0-9]*$/);
  const allowDecimal = new RegExp(/^\d{1,4}\.{1}\d{2}$/);
  if (e.target.name === "stock") {
    if (!onlyNumber.test(e.target.value)) {
      setErrorHandler({
        ...errorHandler,
        [e.target.name]: "Only numbers allowed",
      });
    } else {
      setErrorHandler({ ...errorHandler, [e.target.name]: "" });
    }
  }

  if (e.target.name === "ISBN") {
    if (!onlyNumber.test(e.target.value)) {
      setErrorHandler({
        ...errorHandler,
        [e.target.name]: "Only numbers allowed",
      });
    } else if (e.target.value.length !== 13) {
      setErrorHandler({
        ...errorHandler,
        [e.target.name]: "Must contain 13 numbers",
      });
    } else setErrorHandler({ ...errorHandler, [e.target.name]: "" });
  }

  if (e.target.name === "edition") {
    if (!onlyNumber.test(e.target.value)) {
      setErrorHandler({
        ...errorHandler,
        [e.target.name]: "Only numbers allowed",
      });
    } else if (
      e.target.value.length !== 4 ||
      e.target.value > Number(new Date().getFullYear()) ||
      e.target.value < 1800
    ) {
      setErrorHandler({
        ...errorHandler,
        [e.target.name]: "Must be a valid Year.",
      });
    } else {
      setErrorHandler({ ...errorHandler, [e.target.name]: "" });
    }
  }

  if (e.target.name === "price")
    if (!allowDecimal.test(e.target.value)) {
      setErrorHandler({
        ...errorHandler,
        [e.target.name]: "Please follow this format '####.##'.",
      });
    } else {
      setErrorHandler({ ...errorHandler, [e.target.name]: "" });
    }
}
