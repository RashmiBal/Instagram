import React, { Component } from 'react'

export default class FollowItem extends Component {
  render() {
    const { followuser, fusername } = this.props;
    return (
      <div className="card bg-light"  data-toggle="tooltip" title={fusername} id={followuser}>
        <div className="card-body text-center">
          <p className="card-text">
            <h5 className="text-muted">{fusername}</h5>
          </p>
        </div>
      </div>
    );
  }
}
