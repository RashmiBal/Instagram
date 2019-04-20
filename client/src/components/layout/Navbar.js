import React, { Component } from 'react'

 class Navbar extends Component {
  render() {
    return (
<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html"> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
       </nav> 
    )
  }
}

export default Navbar;
