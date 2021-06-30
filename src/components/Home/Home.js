import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { withRouter } from "react-router-dom";

const Home = inject("RootStore")(
  // withRouter(
  observer(
    class Home extends Component {
      render() {
        return <h1>Hello</h1>;
      }
    }
  )
  // )
);

export default Home;
