import React, { Component } from 'react'
import FollowItem from "./FollowItem";

export default class Followers extends Component {
  render() {
    const { followers } = this.props;
    let f = followers.map(follower => <FollowItem key={follower._id} followuser={follower.user} fusername={follower.username}/>);
    return (
      <div>
        <h4 className="text-muted">Followers:</h4>
        <div className="card-columns">{f}</div>
      </div>
    )
  }
}

