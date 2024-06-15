import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userVoteArray: [],
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addVote: (state, action) => {
      state.userVoteArray.push(action.payload);
    },
    removeVote: (state, action) => {
      state.userVoteArray = state.userVoteArray.filter(
        (each) => each !== action.payload
      );
    },
    resetVoteArray: (state) => {
      state.userVoteArray = [];
    },
    loadUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { addVote, removeVote, loadUser, logoutUser, resetVoteArray } =
  userSlice.actions;
export default userSlice.reducer;
