import React from 'react';
import { Link } from 'react-router-dom';
import { getData } from 'utils';

import { ReactComponent as Logo } from 'assets/svg/onepac_logo.svg';

import './style.scss';

export const Header = () => {
  const userName = getData('email') || '';

  return (
    <header id="main-header" className="header__main ">
      <div className="container">
        <div className="header__inner row align-items-center">
          <div className="col-4 col-lg-4">
            <Link className="header__logo" to="/" title="onepace news">
              <Logo width="150px" height="70px" />
            </Link>
          </div>
          <div className="col-4 col-lg-4">
            <div className="header__menu">
              <ul className="menu">
                <li className="item">
                  <Link className="item__link" to="/">
                    <span className="item__label">Home</span>
                  </Link>
                </li>
                <li className="item">
                  <Link className="item__link" to="/search">
                    <span className="item__label">Search</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-4 col-lg-4">
            <div className="header__action justify-content-end">
              <Link to="/account" type="button" className="account">
                {userName ? `Hi ${userName}!` : 'Account'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
