import React, { useState } from "react";

const LoginForm = ({ onSubmit, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="row" bis_skin_checked="1">
        {error && (
          <div className="alert-box danger-alert">
            <div className="alert">
              <h6>{error}</h6>
            </div>
          </div>
        )}
        <div className="col-12" bis_skin_checked="1">
          <div className="input-style-1" bis_skin_checked="1">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="col-12" bis_skin_checked="1">
          <div className="input-style-1" bis_skin_checked="1">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="col-12" bis_skin_checked="1">
          <div
            className="button-group d-flex justify-content-center flex-wrap"
            bis_skin_checked="1"
          >
            <button
              className="main-btn primary-btn btn-hover w-100 text-center"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
