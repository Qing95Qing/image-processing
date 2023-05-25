import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './style/index.css';

function Header() {

  return (
    <ul className="nav-container">
      <li className="nav-item">
        <NavLink to="prediction"><FormattedMessage id='PREDICT' /></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="models"><FormattedMessage id='MODEL' /></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="training"><FormattedMessage id="TRAIN" /></NavLink>
      </li>
    </ul>
  );
}

export default Header;
