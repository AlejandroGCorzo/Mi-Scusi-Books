import { loging } from "../../../redux/StoreUsers/usersActions";
import axios from "axios";
// // // // ONSUBMIT // // // //
export default function onSubmit(
  e,
  dispatch,
  history,
  user,
  setOpen,
  setErrors,
  errors
) {
  e.preventDefault();
  axios
    .post("/user/signup", user)
    .then((el) => {
      window.sessionStorage.setItem("token", el.data.token);
      dispatch(loging());
      setOpen(true);
      setTimeout(() => history.push("/"), 2300);
    })
    .catch((el) =>
      setErrors({ ...errors, ...JSON.parse(el.request.response) })
    );
}
