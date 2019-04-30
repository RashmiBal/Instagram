import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { followUser, unfollowUser} from "../../actions/profileActions";

class ProfileItem extends Component {
  onFollowClick(id, username) {
    alert('Follow user ID:' + id + ' ' + username);
    this.props.followUser(id);
  }

  onUnfollowClick(id, username) {
    alert('Unfollow user ID:' + id + ' ' + username);
    this.props.unfollowUser(id);
  }

  render() {
    const { viewprofile } = this.props;// THIS IS VIEW USERS PROFILE
    const { profile } = this.props.profile; // CURR USERS PROFILE

    let followButton = null;
    let unFollowButton = null;

    // IF PROFILE IS NULL SKIP
    if (profile !== null) {
    let followerList = profile.follower.map(f => f.user); 
    let followingList = profile.following.map(f => f.user); 

    let userInFollowerList = followerList.find(f => f === viewprofile.user._id);
    let userInFollowingList = followingList.find(f => f === viewprofile.user._id);

    // Add only 1 button either -> Follow or UnFollow
    // If user In FollowingList then create [Unfollow button]
    unFollowButton = (userInFollowingList !== undefined && userInFollowingList.length > 0)? "*Unfollow*":null;

    // If user In both FollowingList & FollowerList then you need only [Unfollow button] if not:
    if (unFollowButton === null) {
      // then if user In FollowerList create [Follow button] so logged in user can click to follow if he chooses to
      followButton = (userInFollowerList !== undefined && userInFollowerList.length > 0)? "*Follow*":null;
    }

    // Add Follow button to all users in general //??&& profile.user._id !== viewprofile.user._id
    if (unFollowButton === null && followButton == null) {
      followButton = "*Follow*";
    }

  }

  const profileItemContent  = (    
  <div className="card card-body bg-light mb-3">
  <div className="row">
    <div className="col-2">
      <img src={viewprofile.user.avatar} alt="" className="rounded-circle" />
    </div>
    <div className="col-lg-6 col-md-4 col-8">
    <h4 className="text-muted">{viewprofile.username}</h4>
      <Link to={`/viewprofile/${viewprofile.user._id}`} className="btn btn-info">
        View Profile
      </Link>
      {' '}
      {(followButton) ? (
            <button
              onClick={this.onFollowClick.bind(this, viewprofile.user._id, viewprofile.username)}
              type="button"
              className="btn btn-success mr-1"
            >
              {followButton}
            </button>
          ) : null} 

      {(unFollowButton) ? (
            <button
              onClick={this.onUnfollowClick.bind(this, viewprofile.user._id, viewprofile.username)}
              type="button"
              className="btn btn-warning mr-1"
            >
              {unFollowButton}
            </button>
          ) : null} 
    </div>
  </div>
</div>
);

    return (
      <div>
      {profileItemContent}
      </div>
    );
  }
}

ProfileItem.propTypes = {
    viewprofile: PropTypes.object.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired //CURR USER PROFILE
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
  });

  export default connect(mapStateToProps, {followUser, unfollowUser})(ProfileItem);
