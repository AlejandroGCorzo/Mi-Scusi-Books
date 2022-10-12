import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
