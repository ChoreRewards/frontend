import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import { AdminStoreContext, AuthStoreContext } from "../../stores";
import { Navbar } from "../";

const Admin = withRouter(
  observer(() => {
    const { loginState } = useContext(AuthStoreContext);
    const { listUsers, createUser, adminState } = useContext(AdminStoreContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isParent, setIsParent] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
      listUsers(loginState.authToken);
    }, [adminState.users]);

    if (!loginState.isAdmin) {
      // TODO - Make this prettier
      return <h1>You are not an admin </h1>;
    }

    const createUsr = (e) => {
      e.preventDefault();
      if (!username) {
        setError("Username must be set");
        return;
      }

      if (!password || !confirmPassword) {
        setError("Password must be set and confirmed");
        return;
      }

      if (password != confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (isAdmin && !isParent) {
        setError("Child admins are not allowed");
        return;
      }

      createUser({
        token: loginState.authToken,
        username,
        email,
        password,
        avatar,
        isParent,
        isAdmin,
      });
    };

    return (
      <div>
        <Navbar />
        {/* User Start */}
        <div className="container">
          <h3 className="text-center">Users</h3>
          <ReactTable
            data={adminState.users}
            sortable={true}
            pageSize={adminState.users.length}
            columns={[
              {
                Header: "ID",
                accessor: "id",
                headerClassName: "text-start",
              },
              {
                Header: "Username",
                accessor: "username",
                headerClassName: "text-start",
              },
              {
                Header: "Email",
                accessor: "email",
                headerClassName: "text-start",
              },
              {
                Header: "Is Admin",
                accessor: (d) => {
                  return d.isAdmin ? "True" : "False";
                },
                id: "isAdmin",
                headerClassName: "text-start",
              },
              {
                Header: "Is Parent",
                accessor: (d) => {
                  return d.isParent ? "True" : "False";
                },
                id: "isParent",
                headerClassName: "text-start",
              },
              {
                Header: "Is Active",
                accessor: (d) => {
                  return d.isActive ? "True" : "False";
                },
                id: "isActive",
                headerClassName: "text-start",
              },
              {
                Header: "Avatar",
                accessor: "avatar",
                headerClassName: "text-start",
              },
              {
                Header: "Points",
                accessor: "points",
                headerClassName: "text-start",
              },
            ]}
          />
          <div className="accordion" id="create-user-accordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Create User
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="heading"
                data-bs-parent="#create-user-accordion"
              >
                <div className="accordion-body">
                  <form>
                    <div className="container-fluid ps-0 pe-0">
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="inputUsername"
                              className="form-label"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputUsername"
                              onChange={(e) =>
                                setError("") || setUsername(e.target.value)
                              }
                              value={username}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              onChange={(e) =>
                                setError("") || setEmail(e.target.value)
                              }
                              value={email}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid ps-0 pe-0">
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="inputPassword"
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword"
                              onChange={(e) =>
                                setError("") || setPassword(e.target.value)
                              }
                              value={password}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="inputPasswordConfirm"
                              className="form-label"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPasswordConfirm"
                              onChange={(e) =>
                                setError("") ||
                                setConfirmPassword(e.target.value)
                              }
                              value={confirmPassword}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="inputAvatar" className="form-label">
                              Avatar
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputAvatar"
                              onChange={(e) =>
                                setError("") || setAvatar(e.target.value)
                              }
                              value={avatar}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="container-fluid ps-0 pe-0">
                            <div className="row">
                              <div className="col">
                                <div className="mb-3 form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isParentCheck"
                                    value={isParent}
                                    onChange={() => setIsParent(!isParent)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isParentCheck"
                                  >
                                    Is Parent?
                                  </label>
                                </div>
                              </div>
                              <div className="col">
                                <div className="mb-3 form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isAdminCheck"
                                    value={isAdmin}
                                    onChange={() => setIsAdmin(!isAdmin)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isAdminCheck"
                                  >
                                    Is Admin?
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={createUsr}
                    >
                      Submit
                    </button>
                  </form>
                  {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User End */}
      </div>
    );
  })
);

export default Admin;
