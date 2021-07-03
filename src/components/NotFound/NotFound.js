import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from '../';
import notFoudImage from '../../images/dog-ate-this-page.png';

const NotFound = class NotFound extends Component {
  render() {
    return (
      <div clasName="wrapper">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col justify-content-center align-self-center">
              <h1>The dog ate this page</h1>
              <p>
                You found a page that doesn't exist. Click{' '}
                <Link to="/home">here</Link> to go back home
              </p>
            </div>
            <div className="col">
              <img alt="dog ate this page" src={notFoudImage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NotFound;
