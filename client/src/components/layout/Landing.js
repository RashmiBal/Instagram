import React, { Component } from 'react'
import { Link } from 'react-router-dom';

 class Landing extends Component {
  render() {
    return (
            <div className="landing">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Stellar Instagram</h1>
                    <p className="lead">
                      {' '}
                      Share your passion and connect with others
                    </p>
                    <hr />
                    <Link to="/register" className="btn btn-lg btn-light mr-2">
                      Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-light mr-2">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
          </div>
    );
  }
}

export default Landing;
