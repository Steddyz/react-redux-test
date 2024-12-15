import React from "react";
import { useDispatch } from "react-redux";
import { removePost } from "../features/PostSlice";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(removePost(post.id))}
      className="flex w-full bg-indigo-500 hover:bg-indigo-300 transition-all py-1 px-2 text-white rounded-sm cursor-pointer mt-4"
    >
      {post.isLoading ? <div>Loading...</div> : <div>{post.title}</div>}
    </div>
  );
};

export default PostItem;
