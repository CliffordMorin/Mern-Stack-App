import React from 'react';
import Post from "./Post/Post.js";
import usestyles from "./styles";

const Posts = () => {
  const classes = usestyles();
  return (
    <>
      <h1>Posts</h1>
      <Post/>
      <Post/>
    </>
  );
};

export default Posts;
