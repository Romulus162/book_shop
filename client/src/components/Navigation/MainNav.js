import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>EpicBooks</h1>
    </div>
    <div className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/auth">Register</NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default MainNavigation;
