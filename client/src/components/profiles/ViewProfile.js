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
    // const { profile } = this.props.profile;
    const { profiles } = this.props.profile;

    let viewprofile1 = profiles.find(profile => profile.user._id === this.props.match.params.userid);
  
    let profileContent;

    if (viewprofile1 === null) {
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
          <button>Follow-UnFollow</button>
          
          <hr />
          <p className="display-4 text-muted">{viewprofile1.username}</p>
          <div>
            Title: {viewprofile1.title} <br />
            WebSite: {viewprofile1.website} <br />
            Bio: {viewprofile1.bio}
          </div>
          <hr />
          Followers: {viewprofile1.follower.length} <br />
          Following: {viewprofile1.following.length} <br />
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
     profile: state.profile,
     profiles: state.profiles
  });

 export default connect(mapStateToProps, { getProfileByUserId })(ViewProfile);

