import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
      }

  render() {
    const { profiles } = this.props.profile;
    let profileItems;
    if (profiles && profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h3 className="font-italic text-warning">No profiles found...</h3>;
      }
    return (
        <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-4 text-center">All Users</h3>
              <p className="lead text-center">
                Browse and connect with others
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { getProfiles })(Profiles);
  
