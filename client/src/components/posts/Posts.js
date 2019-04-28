import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            <div className="col-md-12">
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