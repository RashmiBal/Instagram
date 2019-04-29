import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, unfollowUser} from "../../actions/profileActions";

class FollowItem extends Component {
  onFollowClick(id, username) {
    alert('Follow user ID:' + id + ' ' + username);
    this.props.followUser(id);
  }

  onUnfollowClick(id, username) {
    alert('Unfollow user ID:' + id + ' ' + username);
    this.props.unfollowUser(id);
  }

  render() {
    const { followuser, fusername } = this.props;
    const { profile } = this.props.profile;

    let followerList = profile.follower.map(f => f.user); 
    let followingList = profile.following.map(f => f.user); 

    let userInFollowerList = followerList.find(f => f === followuser);
    let userInFollowingList = followingList.find(f => f === followuser);

    // Add only 1 button either -> Follow or UnFollow
    // If user In FollowingList then create [Unfollow button]
    let followButton = null;
    let unFollowButton = (userInFollowingList !== undefined && userInFollowingList.length > 0)? "*Unfollow*":null;

    // If user In both FollowingList & FollowerList then you need only [Unfollow button] if not:
    if (unFollowButton === null) {
      // then if user In FollowerList create [Follow button] so logged in user can click to follow if he chooses to
      followButton = (userInFollowerList !== undefined && userInFollowerList.length > 0)? "*Follow*":null;
    }
   
    return (
      <div className="card bg-light"  data-toggle="tooltip" title={fusername} id={followuser}>
        <div className="card-body text-center">
          <p className="card-text">
            <h5 className="text-muted">{fusername}</h5>
          </p>
        </div>
         {(followButton) ? (
                  <button
                    onClick={this.onFollowClick.bind(this, followuser, fusername)}
                    type="button"
                    className="btn btn-success mr-1"
                  >
                    {followButton}
                  </button>
                ) : null} 

            {(unFollowButton) ? (
                  <button
                    onClick={this.onUnfollowClick.bind(this, followuser, fusername)}
                    type="button"
                    className="btn btn-warning mr-1"
                  >
                    {unFollowButton}
                  </button>
                ) : null}           
      </div>
    );
  }
}

FollowItem.propTypes = {
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps, {followUser, unfollowUser})(FollowItem);