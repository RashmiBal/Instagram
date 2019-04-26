import axios from 'axios';

import {
  //ADD_POST,
  //GET_ERRORS,
  //CLEAR_ERRORS,
  GET_POSTS,
  //GET_POST,
  //POST_LOADING,
 // DELETE_POST
} from './types';

// Get Posts
export const getPosts = () => dispatch => {
    //dispatch(setPostLoading());
    axios
      .get('/api/posts')
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      );
  };

  // Clear errors
// export const clearErrors = () => {
//     return {
//       type: CLEAR_ERRORS
//     };
//   };