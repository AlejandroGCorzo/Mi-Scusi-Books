import axios from "axios";
import { getAllUsers, getLoggedUserData } from "./usersSlice.js";

export const getUser = () => (dispatch) => {
  dispatch(
    getAllUsers([
      {
        email: "juanfledesma18@gmail.com",
        password: 12345,
      },
      {
        email: "janonanzer@gmail.com",
        password: 12345,
      },
      {
        email: "alejandrogcorzo@gmail.com",
        password: 12345,
      },
      {
        email: "cassiram15@gmail.com",
        password: 12345,
      },
      {
        email: "mgutierrezxred@gmail.com",
        password: 12345,
      },
      {
        email: "agustinnicolas12340@gmail.com",
        password: 12345,
      },
      {
        email: "ricaudjuan11@gmail.com",
        password: 12345,
      },
    ])
  );
};

// export const getLogUser = () => async (dispatch) => {
//   try {
//     const token = await getAccessTokenSilently();
//     const response = await axios.get("http://localhost:9000/user/protected", {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const callProtectedApi = async () => {
//   try {
//     const token = await getAccessTokenSilently();
//     const response = await axios.get("http://localhost:9000/user/protected", {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };