import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import logo from "../assets/logo.png";
import { basics } from "../constants/Common.const";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { login } from "../services/LoginService";
import { validateEmail, validatePassword } from "../services/validateService";
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = () => {
    if (!(validateEmail(emailId))?.success) return false;
    else if (!(validatePassword(password))?.success) return false;
    else return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { emailId, password };

    try {
      const response = await login(userData);
      if (response.ok) {
        const result = await response.json();
        console.log("Login Response:", result);
        if (result?.success) {
          localStorage.setItem("userId", result?.data?.userId);
          localStorage.setItem("token", result?.data?.authToken);
          localStorage.setItem("initial", result?.data?.initial);
          setTimeout(() => {
            navigate("/home");
          }, 100);
        } else toast.error(result?.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  useEffect(()=> {

  },[])
  return (
    <div className="login-main-container">
      <div className="login-left-container">
        <div className="login-logo-container">
          <img src={logo} alt="CTM App Logo" className="login-logo" />
          <h4 className="login-title">{basics.title}</h4>
        </div>
      </div>

      <div className="login-right-container">
        <div className="login-card">
          <h1 className="login-heading"><LoginIcon/> Login</h1>
          <form onSubmit={handleLogin}>
            <div className="login-form-group">
              <TextField
                label="Email Id"
                type="email"
                variant="outlined"
                fullWidth
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                error={emailId && !(validateEmail(emailId))?.success}
                helperText={
                  emailId &&
                  !(validateEmail(emailId))?.success
                    ? (validateEmail(emailId))?.reason
                    : ""
                }
                required
              />
            </div>
            <div className="login-form-group">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password && (password.length < 8 || password.length > 20)}
                helperText={
                  password &&
                  !(validatePassword(password))?.success
                    ? (validatePassword(password))?.reason
                    : ""
                }
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn-submit"
              disabled={!isFormValid()}
            >
              Login
            </button>
          </form>

          <p
            onClick={handleNavigateToRegister}
            className="login-register-link"
          >
            Don't have an account? <span>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
