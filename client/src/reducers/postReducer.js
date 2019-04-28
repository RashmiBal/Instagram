import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    //POST_LOADING
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    post: {} //, Uncommenting this line fixed the issue for when you click on Comment button on a post it takes you to Post.js page
    //loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
      case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
      case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
      default:
      return state;
    }
}
