import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { username, email, isAuthenticated, token } = action.payload.user;
      state.username = username;
      state.email = email;
      state.isAuthenticated = isAuthenticated;
      state.token = token
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer