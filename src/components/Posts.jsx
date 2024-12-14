import React from "react";
import PostItem from "./PostItem";
import { useDispatch } from "react-redux";
import { getPosts } from "../features/PostSlice";
import { useSelector } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector((state) => state.post.isLoading);
  return (
    <div>
      <button
        onClick={() => {
          dispatch(getPosts());
        }}
        type="submit"
        className="bg-lime-300  hover:bg-lime-400 transition-all p-2 text-sm"
      >
        Get posts
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts?.map((post) => <PostItem key={post.title} post={post} />)
      )}
    </div>
  );
};

export default Posts;
