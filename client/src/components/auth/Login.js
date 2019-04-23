import React, { Component } from 'react';


 class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <input className="btn btn-lg btn-success" type="button" value="button" />
        </form>
      </div>
    )
  }
}

export default Login;
