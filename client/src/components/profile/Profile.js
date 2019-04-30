import React, { Component } from "react";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Followers from "./Followers";
import Followings from "./Followings";

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    let dashboardContent;
    let profilefound = 0;

    if (profile !== null) {
      profilefound = 1;
    }

    if (profilefound > 0) {
      dashboardContent = (
        <div>
          <p className="display-4 text-muted">Welcome {user.name}</p>
          <div>
            Title: {profile.title} <br />
            WebSite: {profile.website} <br />
            Bio: {profile.bio}
          </div>
          <hr />
          <div>
            <ul className="nav nav-pills">
              <li>
                <a
                  href="#followers"
                  data-toggle="pill"
                  className="btn btn-light"
                >
                  Followers {profile.follower.length}
                </a>
              </li>
              <li>
                <a
                  href="#following"
                  data-toggle="pill"
                  className="btn btn-light"
                >
                  Following {profile.following.length}
                </a>
              </li>
              <li>
                <Link to="/edit-profile" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" /> Edit
                  Profile
                </Link>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade in active" id="followers">
                <Followers followers={profile.follower} />
              </div>
              <div className="tab-pane fade" id="following">
                <Followings followings={profile.following} />
              </div>
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: "60px" }} />
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger"
          >
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <br/>
          <Link to="/create-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Profile);
