import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByUserId } from '../../actions/profileActions';


class ViewProfile extends Component {
    componentDidMount() {
        if (this.props.match.params.userid) {
          this.props.getProfileByUserId(this.props.match.params.userid); // this maps to profile.user._id
        }
      }

  render() {
    const { profile } = this.props.profile;
    let profileContent;

    if (profile === null) {
      profileContent = "Loading...";
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <p className="display-4 text-muted">{profile.username}</p>
          <div>
            Title: {profile.title} <br />
            WebSite: {profile.website} <br />
            Bio: {profile.bio}
          </div>
          <hr />
          Followers: {profile.follower.length} <br />
          Following: {profile.following.length} <br />
          <hr />
        </div>
      ); 
    }

    return (
    <div className="profile">
    <div className="container">
      <div className="row">
        <div className="col-md-12">{profileContent}</div>
      </div>
    </div>
  </div>
    )
  }
}

ViewProfile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile
  });

 export default connect(mapStateToProps, { getProfileByUserId })(ViewProfile);

