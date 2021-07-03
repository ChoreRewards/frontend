import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import { withRouter } from "react-router-dom";

import { Navbar } from '../';

const Home = inject('RootStore')(
  // withRouter(
  observer(
    class Home extends Component {
      render() {
        return <Navbar />;
      }
    }
  )
  // )
);

export default Home;
