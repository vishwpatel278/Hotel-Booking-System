import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResetpasswordofUser } from "../utils/apiFunction";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await ResetpasswordofUser(email,password);
      setSuccess("Password reset successfully 🎉");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (e) {
      setError("Failed to reset password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "420px" }}>
        <h3 className="text-center mb-3">Reset Password</h3>

        <p className="text-center text-muted">
          Create a new password for your account
        </p>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>

        <p className="text-center mt-3 mb-0 text-muted">
          Redirecting to login after reset…
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
