import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionsTypes";
import * as api from "../api";
//error toasts!
import { toast } from "react-toastify";

//Action Creators
export const getPosts = (sort, page) => async (dispatch) => {
  try {
    const {
      data: { data, totalPages },
    } = await api.fetchPosts(sort, page);

    dispatch({ type: FETCH_ALL, payload: { data, totalPages } });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log({ data });

    dispatch({ type: CREATE, payload: data });
    toast.success("Post created successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Must complete all required fields to post!");
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    toast.success("Post updated successfully!");
  } catch (error) {
    console.log(error.message);
    toast.error("Must complete all required fields to update!");
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    toast.success("Post deleted");
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
