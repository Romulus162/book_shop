import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';

import './Navigation.css';

const Navigation = props => (
  <AuthContext.Consumer>
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
                  <NavLink to="/auth">Log-In</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/inventory">Inventory</NavLink>
              </li>
              {context.token && (
                <>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>
      );
    }}
  </AuthContext.Consumer>
);
export default Navigation;
