import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      dispatch(setPosts(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      dispatch(deletePosts(id));
    } catch (error) {
      return rejectWithValue(error.response.data);
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
    deletePosts(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
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
      })
      .addCase(removePost.pending, (state) => {
        state.isLoading = true;

        console.log("delete pending");
      })
      .addCase(removePost.fulfilled, (state) => {
        state.isLoading = false;

        console.log("delete fulfilled");
      })

      .addCase(removePost.rejected, (state) => {
        console.log("delete rejected");
      });
  },
});

export default postSlice.reducer;
export const { setPosts, deletePosts } = postSlice.actions;
