import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/onepac_logo.svg';
import './style.scss';

export const Header = () => (
  <header id="main-header" className="header">
    <div className="container">
      <div className="header__inner">
        <Link className="header__logo" to="/" title="{{shop.name}}">
          <Logo width="200px" height="70px" />
        </Link>

        <div className="header__menu">
          <ul className="menu">
            <li className="item">
              <Link className="item__link" to="/">
                <span className="item__label">Home</span>
              </Link>
            </li>
            <li className="item">
              <Link className="item__link" to="/category">
                <span className="item__label">Category</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="header__action">
          <Link to="/" type="button" className="account">
            Account
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
