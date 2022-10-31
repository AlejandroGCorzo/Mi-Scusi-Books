import { getUserDetails, loging } from "../../../redux/StoreUsers/usersActions";
import axios from "axios";

export default function submitProfileChanges({
  e,
  profile,
  changes,
  token,
  dispatch,
  errors,
  setErrors,
  setEdit,
}) {
  e.preventDefault();
  changes.phone !== profile.phone
    ? axios
        .get(
          `https://api.apilayer.com/number_verification/validate?number=${changes.phone}&apikey=${process.env.REACT_APP_PHONE_NUMBER_VERIFICATION_KEY}`
        )
        .then((el) => {
          if (el.data.valid) {
            axios
              .put(`user/update/${profile._id}`, changes, {
                headers: { authorization: `Bearer ${token}` },
              })
              .then(() => {
                dispatch(getUserDetails(profile._id, token));
                dispatch(loging());
                setEdit(false);
              })
              .catch((e) => console.log(e));
          } else
            setErrors({ ...errors, phone: "Must be a valid phone number." });
        })
    : axios
        .put(`user/update/${profile._id}`, changes, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          dispatch(getUserDetails(profile._id, token));
          dispatch(loging());
          setEdit(false);
        })
        .catch((e) => console.log(e));
}
