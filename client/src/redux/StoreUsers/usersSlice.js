import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedUser:{}
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getLoggedUserData: (state, action)=>{
      state.loggedUser = action.payload
    }
  },
});

export const { getAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
