import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboardContainer";
import FourZeroFour from "../components/error/404";
import LoginContainer from "../components/auth/loginContainer";
import RegisterContainer from "../components/auth/registerContainer";
import AuthenticatedRoute from "../components/helpers/authenticatedRoute";
import LogoutHandler from "../components/helpers/logoutHandler";
import AfkEarnContainer from "../components/afk/afkEarnContainer";
import NodeStatusContainer from "../components/nodes/status/nodeStatusContainer";
import ServerCreateContainer from "../components/servers/create/serverCreateContainer";
import ServersContainer from "../components/servers/serversContainer";
import ServerEditContainer from "../components/servers/edit/serverEditContainer";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute key={"dashboard"}>
              <Dashboard />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <AuthenticatedRoute key={"logout"}>
              <LogoutHandler />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/afk"
          element={
            <AuthenticatedRoute key={"afk"}>
              <AfkEarnContainer />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/nodes"
          element={
            <AuthenticatedRoute key={"nodes-status"}>
              <NodeStatusContainer />
            </AuthenticatedRoute>
          }
        />
        <Route path="/servers">
          <Route
            path=""
            element={
              <AuthenticatedRoute key={"servers"}>
                <ServersContainer />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="new"
            element={
              <AuthenticatedRoute key={"create-server"}>
                <ServerCreateContainer />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <AuthenticatedRoute key={"edit-server"}>
                <ServerEditContainer />
              </AuthenticatedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
