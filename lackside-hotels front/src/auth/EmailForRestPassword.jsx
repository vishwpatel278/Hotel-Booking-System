import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyExistingUser } from "../utils/apiFunction";

const EmailForResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    const data = await VerifyExistingUser(email)

    navigate("/VerifyForReset", {
      state: { email }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Reset Password</h3>
        <p className="text-center text-muted">
          Enter your email to receive OTP
        </p>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForResetPassword;