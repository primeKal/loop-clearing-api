// SignUpForm.jsx
import React, { useRef, useState, } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from "../../EndPoints";
import { useNavigate} from "react-router-dom";
import './Signup.css'; // Import the CSS file

function SignUp() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setErrorMessage("");
    setSuccessMessage("");

    console.log({ name, email, password });
    // Here you would typically send the data to your backend for registration
    fetch(baseUrl + "user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // Handle successful signup
          console.log('Signed up successfully');
          setSuccessMessage("Signed up successfully");
          navigate("/login");
        } else {
          // Handle signup error
          console.log('Signup failed');
          setErrorMessage("Something went wrong during signup");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage("Something went wrong during signup");
      });


  };

  return (
    <div className='center-signup'>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required />

        <button type="submit">Sign Up</button>
        <div>
          Or <Link to="/login">Log In</Link>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </form>
    </div>
  );
}

export default SignUp;