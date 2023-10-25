import React from 'react';
import { NavLink } from 'react-router-dom';

import authContext from '../../context/auth-context';
import './MainNavigation.css';

const MainNavigation = props => (
  <authContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>EpicBooks</h1>
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
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
              )}
            </ul>
          </div>
        </header>
      );
    }}
  </authContext.Consumer>
);

export default MainNavigation;

//at present, when having a token, it does not display the desired links
//this is a stopping point that I will continue later
