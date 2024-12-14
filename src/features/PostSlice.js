import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const getPosts = createAsyncThunk(
  "posts/post",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      dispatch(setPosts(response.data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;

        console.log("pending");
      })
      .addCase(getPosts.fulfilled, (state) => {
        state.isLoading = false;

        console.log("fulfilled");
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        console.log("rejected");
      });
  },
});

export default postSlice.reducer;
export const { setPosts } = postSlice.actions;
