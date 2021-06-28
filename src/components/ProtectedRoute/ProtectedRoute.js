import { Route, Redirect } from "react-router-dom";
import { inject } from "mobx-react";

const ProtectedRouteComponent = ({
  component: Component,
  AuthStore,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      AuthStore.isAuthenticated ? (
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

const ProtectedRoute = inject("AuthStore")(ProtectedRouteComponent);
export default ProtectedRoute;
