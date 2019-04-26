import {
    //ADD_POST,
    GET_POSTS,
    //GET_POST,
    //DELETE_POST,
    //POST_LOADING
  } from '../actions/types';
  
  const initialState = {
    posts: []
    //post: {},
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
      default:
      return state;
    }
}
