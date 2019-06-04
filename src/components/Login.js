import React, { Component } from 'react';
import {
  Redirect,
  withRouter
} from "react-router-dom";
import credentials from '../mock/credentials';
import {setInSessionStorage, getFromSessionStorage} from '../utils/utils';

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(username, password, cb) {
    credentials.forEach((item) => {
      if (username === item.userName &&
        password === item.password) {
          this.isAuthenticated = true;
          setInSessionStorage("loggedInUser", item);
          setInSessionStorage("isAuthenticated", true);
          setTimeout(cb, 1000); // fake async  
        }
    });
  },
  signout(cb) {
    this.isAuthenticated = false;
    setInSessionStorage("isAuthenticated", false);
    setTimeout(cb, 100);
  }
};

export const AuthButton = withRouter(
  ({ history }) =>
    getFromSessionStorage("isAuthenticated") ? (
      <p className="user-context">
        <span className="welcome-text"> Welcome! </span>
        <b className="logged-in-user">
        {getFromSessionStorage("loggedInUser").userName}
        </b>
        <button
          className="logout-btn"
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}>
          log out
        </button>
      </p>
    ) : (
      <p className="user-context"></p>
    )
);

export class Login extends Component {
  state = { 
    loginSuccess: false,
    username: '',
    password: ''
  };

  login = () => {
    const {username, password} = this.state;
    fakeAuth.authenticate(username, password, () => {
      this.setState({ loginSuccess: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/mailBoard" } };
    let { loginSuccess } = this.state;

    if (loginSuccess) return <Redirect to={from} />;

    return (
      <div className="login-container">
        <form>
            <div class="form-group"> Already a member
            </div>
            <div class="form-group">
              <i class="fa fa-user"></i>
              <input type="text" class="form-control" 
              value={this.state.username} 
              onChange={(e) => {this.setState({username: e.target.value})}}
              placeholder="Username" required="required" />
            </div>
            <div class="form-group">
              <i class="fa fa-lock"></i>
              <input type="password" class="form-control" 
              value={this.state.password} 
              onChange={(e) => {this.setState({password: e.target.value})}}
              placeholder="Password" required="required" />         
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-login" onClick={this.login} value="Login">
                Login
              </button>
            </div>
          </form>
        </div>
    );
  }
}
