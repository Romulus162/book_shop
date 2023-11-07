import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>EpicBooks</h1>
    </div>
    <div className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/inventory">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </div>
  </header>
);
export default Navigation;
