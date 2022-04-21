import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  START_LOADING,
  END_LOADING,
  OPEN_FORM,
  CLOSE_FORM,
} from "../constants/actionsTypes";
import * as api from "../api";
//error toasts!
import { toast } from "react-toastify";

//Action Creators
export const getPosts = (sort, page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, totalPages },
    } = await api.fetchPosts(sort, page);

    dispatch({ type: FETCH_ALL, payload: { data, totalPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

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

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });
    toast.success("Comment added successfully!");
    return data.comments;
  } catch (error) {
    toast.error("There was an error adding your comment!");
    console.log(error);
  }
};

export const openForm = (id) => (dispatch) => {
  dispatch({ type: OPEN_FORM, isFormOpen: true, id });
  console.log("open form");
};

export const closeForm = () => (dispatch) => {
  dispatch({ type: CLOSE_FORM, isFormOpen: false });
  console.log("close form");
};
