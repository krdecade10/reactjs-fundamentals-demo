import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import RouterIndex from './router';
import React from 'react';
import { LoginContext, LoginContextProvider } from './providers/login-context.provider';
import { LoginContextState } from './models/login-context.model';

class App extends React.Component {
  render(): any {
    return (
      <div className="App">
        <Router>

          <LoginContextProvider>
            <div className="top-nav">
              <Link className="top-nav-link" to="/">Home</Link>
              <Link className="top-nav-link" to="/posts">Posts</Link>
              <Link className="top-nav-link" to="/profile">Profile</Link>

              <LoginContext.Consumer>
                {
                  (context) => {
                    if (context.profile.isLogin) {
                      return (
                        <button className="top-nav-link" onClick={ () => this.onLogout(context) }>Log out</button>
                      )
                    } else {
                      return (
                        <Link className="top-nav-link" to="/login">Login</Link>
                      )
                    }
                  }
                }
              </LoginContext.Consumer>
            </div>

            <RouterIndex />
          </LoginContextProvider>

        </Router>
      </div>
    );
  }

  private onLogout(context: LoginContextState): void {
    context.deleteLoginProfile();
  }
}

export default App;
