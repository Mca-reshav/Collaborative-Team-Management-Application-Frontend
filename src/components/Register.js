import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/register.css";
import logo from "../assets/logo.png";
import { basics } from "../constants/Common.const";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { toast } from "react-toastify";
import { register } from "../services/registerService";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  validateContactNo,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
} from "../services/validateService";

const Register = () => {
  const [name, setName] = useState("");
  const [emailId, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login')
  }
  const isFormValid = () => {
    if (!validateName(name)?.success) return false;
    else if (!validateEmail(emailId)?.success) return false;
    else if (!validateContactNo(contactNo)?.success) return false;
    else if (!validatePassword(password)?.success) return false;
    else if (!validateDate(dateOfBirth)?.success) return false;
    else return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      emailId,
      contactNo,
      password,
      gender,
      dateOfBirth: dateOfBirth.toISOString(),
    };

    try {
      const response = await register(userData);

      if (response.ok) {
        const result = await response.json();
        if (result?.success) {
          localStorage.setItem(
            "userId",
            result?.data?.userId,
            "token",
            result?.data?.authToken
          );
          toast.info("Registration Successful,Please login");
          navigate("/login");
        } else toast.error(result?.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-left-container">
        <div className="register-logo-container">
          <img src={logo} alt="CTM App Logo" className="register-logo" />
          <h4 className="register-title">{basics.title}</h4>
        </div>
      </div>

      <div className="register-right-container">
        <div className="register-card">
          <h1 className="register-heading">
            {" "}
            <AppRegistrationIcon /> Register
          </h1>

          <form onSubmit={handleRegister}>
            <div className="register-form-group">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={name && !validateName(name)?.success}
                helperText={
                  name && !validateName(name)?.success
                    ? validateName(name)?.reason
                    : ""
                }
                required
              />
            </div>

            <div className="register-form-group">
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                error={emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)}
                helperText={
                  emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)
                    ? "Invalid email address"
                    : ""
                }
                required
              />
            </div>

            <div className="register-form-group">
              <TextField
                label="Contact No"
                type="text"
                variant="outlined"
                fullWidth
                value={contactNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setContactNo(value);
                  }
                }}
                error={contactNo.length > 0 && contactNo.length !== 10}
                helperText={
                  contactNo.length > 0 && contactNo.length !== 10
                    ? "Contact number must be exactly 10 digits"
                    : ""
                }
                required
              />
            </div>

            <div className="register-form-group">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 20) {
                    setPassword(value);
                  }
                }}
                error={
                  password.length > 0 &&
                  (password.length < 8 || password.length > 20)
                }
                helperText={
                  password.length > 0 && password.length < 8
                    ? "Password must be at least 8 characters long"
                    : password.length > 20
                    ? "Password must not exceed 20 characters"
                    : ""
                }
                required
              />
            </div>

            <div className="register-form-group">
              <RadioGroup
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                row
              >
                <FormControlLabel value="1" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="3" control={<Radio />} label="Other" />
              </RadioGroup>
            </div>

            <div className="register-form-group">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  required
                />
              </LocalizationProvider>
            </div>
            <button
              type="submit"
              className="register-btn-submit"
              disabled={!isFormValid}
            >
              Register
            </button>
          </form>
          <p onClick={handleNavigateToLogin} className="login-register-link">
            Yes, I have an account. <span> Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
