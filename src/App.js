import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import mailsMock from './mock/inboxMails';
import MailBoard from './MailBoard';
import {setInSessionStorage, getFromSessionStorage} from './utils/utils';
import credentials from './mock/credentials';


function AuthMailBoard() {
  return (
    <Router>
      <div>
        <AuthButton />
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />        
        <PrivateRoute path="/mailBoard" component={MailBoard} />
      </div>
    </Router>
  );
}

const fakeAuth = {
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

const AuthButton = withRouter(
  ({ history }) =>
    getFromSessionStorage("isAuthenticated") ? (
      <p className="user-context">
        Welcome!
        <b className="logged-in-user">
        {getFromSessionStorage("loggedInUser").userName}
        </b>
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p className="user-context">You are not logged in.</p>
    )
);

function PrivateRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        getFromSessionStorage("isAuthenticated") ? (
          <Component {...props} mailsMock={mailsMock} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}


class Login extends Component {
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
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
          <form className="form" id="signup">
            <input 
              type="email" 
              value={this.state.username} 
              placeholder="Username" 
              onChange={(e) => {this.setState({username: e.target.value})}} />
            <input 
              type="password" 
              value={this.state.password} 
              placeholder="Password" 
              onChange={(e) => {this.setState({password: e.target.value})}} />
            <button type="button" id="login-button" onClick={this.login}>Login</button>
          </form>
      </div>
    );
  }
}

export default AuthMailBoard;
