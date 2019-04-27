import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions"; import PostItem from '../posts/PostItem';

 class Post extends Component {
   componentDidMount() {
     this.props.getPost(this.props.match.params.id);
   }

   render() {
        const {post} = this.props.post;
       let postContent;
    //    if (post === null || Object.keys(post).length === 0) {
         postContent = <PostItem post={post} showActions={false} />;//<h1>Loading...</h1>;
    //    } else {
    //      postContent = (
    //        <div>
    //          <PostItem post={post} showActions={false} />
    //        </div>
    //      );
    //    }
     return (
       <div className="post">
         <div className="container">
           <div className="row">
             <div className="col-md-12">
               <Link to="/feed" className="btn btn-light mb-3">
                 Back To Feed
               </Link>
               {postContent} 
             </div>
           </div>
         </div>
       </div>
     );
   }
 }
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);