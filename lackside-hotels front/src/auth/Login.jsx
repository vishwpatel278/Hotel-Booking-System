import React, { useState } from "react";
import { loginUser } from "../utils/apiFunction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);

    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 login-card">
        <h2 className="text-center mb-4">Login</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="text-end mb-3">
            <span
              className="forgot-password-link"
              onClick={() => navigate("/EmailToResetPassword")}
            >
              Forgot password?
            </span>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-hotel">
              Login
            </button>
          </div>

          <p className="text-center mb-0">
            Don’t have an account?
            <Link to={"/register"} className="ms-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;