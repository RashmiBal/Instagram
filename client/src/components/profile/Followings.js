import React, { Component } from 'react';
import FollowItem from "./FollowItem";

export default class Followings extends Component {
  render() {
    const { followings } = this.props;
    let f = followings.map(following => <FollowItem key={following._id} followuser={following.user} fusername={following.username}/>);
    return (
      <div>
        <h4 className="text-muted">Following:</h4>
        <div className="card-columns">{f}</div>
      </div>
    )
  }
}

