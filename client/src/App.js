import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";
// import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profiles from './components/profiles/Profiles';
import Profile from "./components/profile/Profile";
import ViewProfile from "./components/profiles/ViewProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Posts from "./components/posts/Posts";
import PrivateRoute from "./components/common/PrivateRoute";
import "./App.css";
import Post from "./components/post/Post";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <Route exact path="/profiles" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/viewprofile/:userid" component={ViewProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
