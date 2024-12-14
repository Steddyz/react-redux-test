import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/UserSlice";
import { todoSlice } from "../features/TodoSlice";
import { postSlice } from "../features/PostSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    todo: todoSlice.reducer,
    post: postSlice.reducer,
  },
});
