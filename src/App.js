 import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import {Login, AuthButton} from './components/Login';
import mailsMock from './mock/mailsMock';
import MailBoard from './components/MailBoard';
import {setInSessionStorage, getFromSessionStorage} from './utils/utils';


class AuthMailBoard extends Component {
  render() {
    return (
      <Router>
          <AuthButton />
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />        
          <PrivateRoute path="/mailBoard" component={MailBoard} />
      </Router>
    );
  }
}


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

export default AuthMailBoard;
