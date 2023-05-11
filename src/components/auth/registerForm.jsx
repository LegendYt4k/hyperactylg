import React, { useState } from "react";

const RegisterForm = ({ onSubmit, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, username });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert-box danger-alert"><div className="alert"><h6>{error}</h6></div></div>}
      <div className="col-12">
        <div className="input-style-1">
          <label>Username</label>
          <input
            type="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
      </div>
      <div className="col-12">
        <div className="input-style-1">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
      </div>
      <div className="col-12">
        <div className="input-style-1">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div className="col-12">
        <div className="button-group d-flex justify-content-center flex-wrap">
          <button className="main-btn primary-btn btn-hover w-100 text-center" type="submit">
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
