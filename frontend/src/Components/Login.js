import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Clear previous error messages
    setEmailError("");
    setPasswordError("");

    // Validate user input
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      const result = await fetch("http://localhost:3000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      switch (result.status) {
        case 400:
          setError("password does not match ");
          break;
        case 409:
          setError("User already exists. Please try with another email.");
          break;
        case 404:
          setError("User does not exist ");
          break;
        case 403:
          setError("All fields are required.");
          break;
        case 200:
            const data = await result.json();
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
          break;
        default:
          setError("An error occurred. Please try again later.");
      }
  
    }
  };

  return (
    <div className="signup">
      <h1>Log-in</h1>
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your E-mail"
        required
      />
      {emailError && <div className="error">{emailError}</div>}
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      {passwordError && <div className="error">{passwordError}</div>}
      {error && <div className="error">{error}</div>}
      <button onClick={handleLogin} className="btn">
        Log-in
      </button>
    </div>
  );
};

export default Login;
