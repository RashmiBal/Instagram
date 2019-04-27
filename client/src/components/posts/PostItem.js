import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  render() {
    const { post } = this.props;
    return (
      <div>
        PostItem
        <p>{post.text}</p>
        <button
          onClick={this.onDeleteClick.bind(this, post._id)}
          type="button"
          className="btn btn-danger mr-1"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(
  PostItem
);
