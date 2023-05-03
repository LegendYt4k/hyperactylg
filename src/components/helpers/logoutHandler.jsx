import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

const LogoutHandler = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    localStorage.removeItem("token");
    setLoggedOut(true);
  }, []);
  if (!loggedOut) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
  return <Navigate to={"/login"} replace={true} />;
};

export default LogoutHandler;
