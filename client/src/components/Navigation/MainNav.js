import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/Auth-context';
import './MainNavigation.css';

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>AdminPortal</h1>
          </div>
          <div className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Register</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/books">Books</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/orders">Orders</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;

//at present, when having a token, it does not display the desired links
//this is a stopping point that I will continue later
