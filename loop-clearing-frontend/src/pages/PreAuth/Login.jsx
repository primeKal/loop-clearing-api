// LoginForm.jsx
import React, { useRef, useState } from 'react';
import './Login.css'; // Import the CSS file
import {baseUrl} from "../../EndPoints"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Login() {
 // Your component logic here
 const emailRef = useRef(null);
 const passwordRef = useRef(null);
 const dispatch = useDispatch();
 const [error, setError] = useState("")
 const navigate = useNavigate();

  // Dispatch a login action
  const handleLogin = (userData) => {
    console.log("user data is", userData)
    dispatch({ type: 'LOGIN', payload: userData });
 };


 const handleSubmit = (event) => {
    event.preventDefault();

    setError("")
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log({ email, password });
    // Here you would typically send the data to your backend for authentication
    fetch(baseUrl + "auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
   })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Handle successful login
          console.log('Logged in successfully');
          handleLogin(data)
          navigate("/");
        } else {
          // Handle login error
          console.log('Login failed');
          setError("Something went wrong")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError("Something went wrong")
      });
 };

 return (
  <div className='center-login'>
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" ref={emailRef} required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" ref={passwordRef}  required />

      <button type="submit">Login</button>
      <div>
        Or <Link to="/signup">Sign Up</Link>
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  </div>
 );
}

export default Login;
