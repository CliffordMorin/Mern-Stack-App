import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  //Pagination
  const PAGE_SIZE = 4;
  const page = parseInt(req.query._page || "1");
  const total = await PostMessage.countDocuments();

  //client send server query ?sort=
  const sort = req.query;

  try {
    let posts = await PostMessage.find();

    if (sort._sort === "newest") {
      posts = posts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    }
    if (sort._sort === "oldest") {
      posts = posts.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
    }
    if (sort._sort === "most-likes") {
      posts = posts.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
    }
    if (sort._sort === "least-likes") {
      posts = posts.sort((a, b) => {
        return a.likes.length - b.likes.length;
      });
    }
    //pagination after sort
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    posts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    res
      .status(200)
      .json({ data: posts, totalPages: Math.ceil(total / PAGE_SIZE) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    console.log("New Post saved to database");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  //checks to see if id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  //checks to see if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //check to see if user is authenticated
  //if not authenticated return
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  //checks to see if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);
  //if the post is already liked by user
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like post
    //add id to likes array
    post.likes.push(req.userId);
  } else {
    //dislike
    //remove id from likes array
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
