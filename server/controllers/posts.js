import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;

  const newPost = new PostMessage(body);

  try {
    await newPost.save();

    console.log("New Post saved to database");
    re.status(201).json(newPost);
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
