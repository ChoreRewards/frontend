import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthStoreContext from "../../stores/AuthStore";

export const ProtectedRoute = observer(({ component: Component, ...rest }) => {
  const { loginState } = useContext(AuthStoreContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        loginState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
});

export default ProtectedRoute;
