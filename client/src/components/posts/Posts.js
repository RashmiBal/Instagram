import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import { getPosts } from '../../actions/postActions';
import {connect} from 'react-redux'; 


class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
      }

  render() {
    const { posts} = this.props.post;
    return (
        <div className="feed">
        <div className="container">
          <div className="row">
          <div className="col-md-2">
              <Link to="/profile" className="btn btn-light mb-3 float-left">
                Back To My Profile
              </Link>
            </div>
            <div className="col-md-10">
              <PostForm />
              <PostFeed posts={posts} /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    post: state.post
  });

export default connect(mapStateToProps, { getPosts })(Posts);