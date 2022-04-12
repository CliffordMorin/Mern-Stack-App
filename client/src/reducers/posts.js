import {
  LIKE,
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionsTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        totalPages: action.payload.totalPages,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export default reducer;
