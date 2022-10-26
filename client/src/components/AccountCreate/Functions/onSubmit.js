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
      // if(el.data.msg){
      //   alert(el.data.msg)
      // } else {
      //   window.sessionStorage.setItem("token", el.data.token);
      //   dispatch(loging());
      //   setOpen(true);
      //   setTimeout(() => history.push("/"), 2300);
      // }
      setOpen(true)
    })
    .catch((el) =>{
      console.log(el)
      setErrors({ ...errors, ...JSON.parse(el.request.response) })}
    );
}
