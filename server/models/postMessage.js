import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creator: String,
  name: String,
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
