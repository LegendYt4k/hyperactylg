import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import settings from "../../../settings";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginForm from "./loginForm";

const LoginContainer = () => {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useLayoutEffect(() => {
    document.title = "Hyperactyl - Login";
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return setLoggedIn(true);
  });

  const handleSubmit = async ({ email, password }) => {
    try {
      if (!email) return setError("Please Provide A Valid Email.");
      if (!password) return setError("Please Provide A Valid Password");
      const rawResp = await fetch(settings.client.domain + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.secret}`,
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });
      const data = await rawResp.json();
      if (rawResp.status !== 200)
        return setError(data.message);
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      setError("Internal server error please contact an admin.");
    }
  };
  if (loggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <section className="signin-section">
      <div className="row auth-row" bis_skin_checked="1">
        <div className="col" bis_skin_checked="1">
          <div
            className="auth-cover-wrapper bg-primary-100"
            bis_skin_checked="1"
          >
            <div className="auth-cover" bis_skin_checked="1">
              <div className="title text-center" bis_skin_checked="1">
                <h1 className="text-primary mb-10">Welcome Back</h1>
                <p className="text-medium">
                  Sign in to your Existing account to continue
                </p>
              </div>
              <div className="cover-image" bis_skin_checked="1">
                <img src="/assets/images/auth/signin-image.svg" alt="b" />
              </div>
              <div className="shape-image" bis_skin_checked="1">
                <img src="/assets/images/auth/shape.svg" alt="a" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6" bis_skin_checked="1">
          <div className="signup-wrapper" bis_skin_checked="1">
            <div className="form-wrapper" bis_skin_checked="1">
              <h6 className="mb-15">Sign In Form</h6>
              <p className="text-sm mb-25">Login to continue to Hyperactyl</p>
              <LoginForm onSubmit={handleSubmit} error={error} />
              <div className="singup-option pt-40" bis_skin_checked="1">
                <p className="text-sm text-medium text-center text-gray">
                  Easy Sign In With
                </p>
                <div
                  className="button-group pt-40 pb-40 d-flex justify-content-center flex-wrap"
                  bis_skin_checked="1"
                >
                  <button className="main-btn primary-btn-outline m-2">
                    <i className="lni lni-discord mr-10"></i>
                    Discord
                  </button>
                  <button className="main-btn danger-btn-outline m-2">
                    <i className="lni lni-google mr-10"></i>
                    Google
                  </button>
                </div>
                <p className="text-sm text-medium text-dark text-center">
                  New User?{" "}
                  <Link to={"/register"} replace={true}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginContainer;
