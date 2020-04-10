import React, { Component } from 'react';
import { Button, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { storeData, getData } from 'utils';

import { ReactComponent as Logo } from 'assets/svg/onepac_logo.svg';

import './style.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: getData('email') || '',
      api: getData('token') || '',
    };
  }

  updateField = (event) => {
    const { target } = event;
    const field = target.getAttribute('name');
    this.setState({
      [field]: target.value,
    });
  };

  handleLogin = () => {
    const { email, api } = this.state;
    if (!email || !api) {
      toast.warn('Please insert your name and API Key');
      return;
    }
    storeData('token', api);
    storeData('email', email);
    window.location.href = '/';
  };

  handleSignOut = () => {
    storeData('token', '');
    storeData('email', '');
    window.location.href = '/';
  };

  render() {
    const { email, api } = this.state;
    return (
      <div className="app__page auth__page">
        <nav className="auth__sidebar">
          <div className="body">
            <div className="header ">
              <Link className="logo mb-4 d-block" to="/">
                <Logo width="150px" />
              </Link>
              <div className="slogan">
                <p className="mb-1">Available for everyone!</p>
                <p className="mb-1">Advanced news with effortlessly...</p>
              </div>
            </div>
            <div className="image" />
          </div>
        </nav>

        <main className="auth__content container-fluid">
          <nav className="auth-nav">
            <p className="auth-link">
              Already a member? <Link to="/">Start now!</Link>
            </p>
          </nav>
          <div className="auth-content">
            <div className="auth-body">
              <h2 className="auth-title">
                Your <strong>OnePac</strong>
              </h2>
              <hr className="divider" />
              <form onSubmit={this.handleLogin} className="auth__form">
                <FormGroup>
                  <div className="mb-2">
                    <label className="auth-label" htmlFor="exampleEmail">
                      Username
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control auth-input"
                    value={email}
                    name="email"
                    onChange={this.updateField}
                    placeholder="Your Username"
                  />
                </FormGroup>
                <FormGroup>
                  <div className="d-flex align-items-center  mb-2">
                    <label className="auth-label" htmlFor="examplePassword">
                      API KEY
                    </label>
                  </div>
                  <input
                    className="form-control auth-input"
                    type="text"
                    value={api}
                    name="api"
                    onChange={this.updateField}
                    placeholder="Your API KEY"
                  />
                </FormGroup>
                <FormGroup>
                  <Button className="auth-actions" onClick={this.handleLogin} type="button">
                    Submit
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button className="auth-actions mt-0 secondary" onClick={this.handleSignOut} type="button">
                    Sign Out
                  </Button>
                </FormGroup>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
