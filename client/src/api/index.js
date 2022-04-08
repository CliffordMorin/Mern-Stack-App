import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });
// const API = axios.create({ baseURL: "https://mindump-project.herokuapp.com" });

//sends jwt to the back end to verify you are logged in, which is then passed through the middleware
// in order for the user to do actions in the app such as like and post
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    //give the req headers the token from local storage with the name Bearer then token name
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (sort) => API.get("/posts?_sort=" + sort);
export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const sign_In = (formData) => API.post("/user/login", formData);
export const sign_Up = (formData) => API.post("/user/signup", formData);
