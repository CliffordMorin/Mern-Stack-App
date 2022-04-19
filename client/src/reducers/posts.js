import {
  LIKE,
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  COMMENT,
  START_LOADING,
  END_LOADING,
} from "../constants/actionsTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        totalPages: action.payload.totalPages,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          //change the post that just received a comment
          if (post._id === action.payload._id) {
            return action.payload;
          }
          //return all the other posts normally
          return post;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
