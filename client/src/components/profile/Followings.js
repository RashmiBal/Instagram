import React, { Component } from 'react';
import FollowItem from "./FollowItem";

export default class Followings extends Component {
  render() {
    const { followings } = this.props;
    let f = followings.map(following => <FollowItem key={following._id} followuser={following.user} fusername={following.username}/>);
    return (
      <div>
        Followings:
        <p>{f}</p>
      </div>
    )
  }
}
