import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import { AdminStoreContext, AuthStoreContext } from "../../stores";
import { Navbar } from "../";
import Users from "./Users";

const Admin = withRouter(
  observer(() => {
    const { loginState } = useContext(AuthStoreContext);
    const { listUsers, createUser, adminState } = useContext(AdminStoreContext);

    useEffect(() => {
      listUsers(loginState.authToken);
    }, [adminState.users]);

    if (!loginState.isAdmin) {
      // TODO - Make this prettier
      return <h1>You are not an admin </h1>;
    }

    return (
      <div>
        <Navbar />
        <Users
          createUser={createUser}
          loginState={loginState}
          users={adminState.users}
        />
      </div>
    );
  })
);

export default Admin;
