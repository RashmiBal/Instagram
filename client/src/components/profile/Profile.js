import React, { Component } from 'react'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

    if (profile !== null){
        profilefound = 1;
    }

    if (profilefound > 0) 
    {
    dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome {user.name}
          </p>
          <div>{profile.title} {profile.website} {profile.bio}</div>
          <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
            </Link>
            </div>

          <div style={{ marginBottom: '60px' }} />
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger"
          >
            Delete My Account
          </button>
        </div>
      );
    }
    else {
        dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome</p>
              <p>You have not yet setup a profile, please add some info</p>
              Create Profile link
            </div>
          );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
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

  export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Profile
  );

