import React, { Component } from 'react'

export default class FollowItem extends Component {
  render() {
    const { followuser, fusername } = this.props;
    return (
      <div>
        Follow Item
        <p>{followuser} {'-----'} {fusername}</p>
      </div>
    )
  }
}
