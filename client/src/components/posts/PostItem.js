import React, { Component } from 'react'

class PostItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        PostItem
        <p>{post.text}</p>
      </div>
    )
  }
}

export default PostItem;