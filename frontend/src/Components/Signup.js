import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const collectData = async () => {
      // Clear previous error messages
      setNameError("");
      setEmailError("");
      setPasswordError("");

      // Validate user input
      let isValid = true;
      if (!name) {
        setNameError("Name is required");
        isValid = false;
      }
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
        try {
          let result = await fetch("http://localhost:3000/post", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
              "content-Type": "application/json",
            },
          });
          
          switch (result.status) {
            case 400:
              setError("Bad request. Please check your input.");
              break;
            case 409:
              setError("User already exists. Please try with another email.");
              break;
            case 403:
              setError("All fields are required.");
              break;
            case 201:
              result = await result.json();
              localStorage.setItem("user", JSON.stringify(result));
              if (result) {
                navigate("/");
              }
              break;
            default:
              setError("An error occurred. Please try again later.");
          }
      
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
      }
    }


    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            {nameError && <div className="error">{nameError}</div>}
            <input className="inputBox" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your E-mail" />
            {emailError && <div className="error">{emailError}</div>}
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            {passwordError && <div className="error">{passwordError}</div>}
            {error && <div className="error">{error}</div>}
            <button onClick={collectData} className="btn">Sign Up</button>
        </div>
    )
}
export default Signup;
