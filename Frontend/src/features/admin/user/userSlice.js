import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  owner: [],
  comment: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchOwnerSuccess: (state, action) => {
      state.owner = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCommentUser: (state, action) => {
      state.comment = action.payload;
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const { fetchUserFailure, userStart, fetchUserSuccess, fetchCommentUser, fetchOwnerSuccess } = userSlice.actions;
export default userSlice.reducer;