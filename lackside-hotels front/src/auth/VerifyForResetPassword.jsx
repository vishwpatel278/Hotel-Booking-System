import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { VerifyUser, resendOtp } from "../utils/apiFunction";

const VerifyForResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    if (errorMsg) setErrorMsg("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d{6}$/.test(pasted)) return;

    setOtp(pasted.split(""));
    inputsRef.current[5]?.focus();
  };

  const handleVerify = async () => {
    const verificationCode = otp.join("");

    if (verificationCode.length !== 6) {
      setErrorMsg("Please enter 6 digit OTP");
      return;
    }

    try {
      await VerifyUser(email, verificationCode);

      setSuccessMsg("Account verified successfully 🎉");
      setErrorMsg("");

      setTimeout(() => navigate("/ResetPassword",{
        state : {
          email : email
        } 
      }), 1500);
    } catch (e) {
      setErrorMsg("Invalid or expired OTP ❌");
      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(email);

      setResendMsg("OTP resent successfully 📩");
      setErrorMsg("");
      setSuccessMsg("");

      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();

      setTimer(30);
      setIsResendDisabled(true);
    } catch (e) {
      setErrorMsg("Failed to resend OTP ❌");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Verify Your Account</h2>

        <p className="verify-subtitle">
          Enter the 6-digit OTP sent to <br />
          <strong>{email}</strong>
        </p>

        <div className="otp-container" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              className="otp-input"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <div className="resend-container">
          {isResendDisabled ? (
            <span className="resend-timer">
              Resend OTP in {timer}s
            </span>
          ) : (
            <button className="resend-btn" onClick={handleResendOtp}>
              Resend OTP
            </button>
          )}
        </div>

        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        {successMsg && <div className="success-msg">{successMsg}</div>}
        {resendMsg && <div className="success-msg">{resendMsg}</div>}

        <button className="verify-btn" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyForResetPassword;
