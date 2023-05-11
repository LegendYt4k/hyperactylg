import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import settings from "../../../settings";

const AuthenticatedRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userData, setUserData] = useState(null);
  const fetchUserData = async (token) => {
    const rawUserData = await fetch("/api/users/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.secret}`,
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    if (rawUserData.status === 400) {
      localStorage.removeItem("token");
      setLoggedIn(false);
      return setIsAuthChecked(true)
    }
    const userData = await rawUserData.json();
    setUserData(userData);
    setIsAuthChecked(true); //added to make it look gud :)
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setIsAuthChecked(true); //added to make it look gud :)
    }
  }, []);

  if (!isAuthChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return loggedIn ? (
    <><children.type {...children.props} Data={userData} /></>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default AuthenticatedRoute;
