// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginSignup.css";

// const LoginSignup = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(isSignup ? "Signing Up..." : "Logging In...");
//     navigate("/");
//   };

//   return (
//     <div className="auth-container">
//       <div className="background-overlay"></div>
//       <div className="auth-box">
//         <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
//         <p>{isSignup ? "Join us and start your journey!" : "Login to continue"}</p>
//         <form onSubmit={handleSubmit}>
//           {isSignup && (
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//         </form>
//         <p className="switch-mode" onClick={() => setIsSignup(!isSignup)}>
//           {isSignup ? "Already have an account? Login" : "New user? Sign up"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;

// import React, { useState } from "react";
// import "./LoginSignup.css";

// const AuthPage = () => {
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);
//   const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   const togglePanel = () => {
//     setIsRightPanelActive(!isRightPanelActive);
//   };

//   // Handle Input Change
//   const handleChange = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignupData({ ...signupData, [name]: value });
//     } else {
//       setLoginData({ ...loginData, [name]: value });
//     }
//   };

//   // Handle Signup
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(signupData),
//       });
//       const data = await response.json();
//       alert(data.message || "Signup successful!");
//     } catch (error) {
//       alert("Error signing up. Try again.");
//     }
//   };

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Login successful!");
//         // Save token to local storage if needed
//         localStorage.setItem("token", data.token);
//       } else {
//         alert(data.message || "Login failed.");
//       }
//     } catch (error) {
//       alert("Error logging in. Try again.");
//     }
//   };

//   return (
//     <div className="auth-body">
//       <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
//       {/* Sign Up Container */}
//       <div className="auth-form-container sign-up-container">
//         <form action="#">
//           <h1>Create Account</h1>
//           <div className="social-container">
//             <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//             <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//             <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//           </div>
//           <span>or use your email for registration</span>
//           <div className="infield">
//             <input type="text" placeholder="Name" />
//           </div>
//           <div className="infield">
//             <input type="email" placeholder="Email" name="email" />
//           </div>
//           <div className="infield">
//             <input type="password" placeholder="Password" />
//           </div>
//           <button className="ghostBtn" type="submit">Sign Up</button>
//         </form>
//       </div>

//       {/* Sign In Container */}
//       <div className="auth-form-container sign-in-container">
//         <form action="#">
//           <h1>Sign in</h1>
//           <div className="social-container">
//             <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//             <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//             <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//           </div>
//           <span>or use your account</span>
//           <div className="infield">
//             <input className="auth-input" type="email" placeholder="Email" name="email" />
//           </div>
//           <div className="infield">
//             <input type="password" placeholder="Password" />
//           </div>
//           <a href="#" className="forgot">Forgot your password?</a>
//           <button className="ghostBtn" type="submit">Sign In</button>
//         </form>
//       </div>

//       {/* Overlay Container */}
//       <div className="overlay-container">
//         <div className="overlay">
//           <div className="animated-bg"></div>
//           <div className="floating-elements">
//             <div>🍃</div>
//             <div>🍃</div>
//             <div>🍃</div>
//             <div>🍃</div>
//             <div>🍃</div>
//           </div>

//           <div className="overlay-panel overlay-left">
//             <h1>Reduce</h1>
//             <p>Join us in making the world greener. Login to track</p>
//             <button className="ghost" onClick={togglePanel}>Sign In</button>
//           </div>

//           <div className="overlay-panel overlay-right">
//             <h1>Start</h1>
//             <p>Sign up and calculate your carbon impact to help make a difference.</p>
//             <button className="ghost" onClick={togglePanel}>Sign Up</button>
//           </div>
//         </div>
//         <button id="overlayBtn" onClick={togglePanel}></button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoginSignup.css';
import { apiUrl } from '../../config/api';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const loginTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (loginTimeoutRef.current) clearTimeout(loginTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verified = params.get('verified');
    if (verified === 'true') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Email verified! You can now log in.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
      window.history.replaceState({}, '', '/auth');
    } else if (verified === 'false') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Verification link is invalid or expired.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
      window.history.replaceState({}, '', '/auth');
    }
  }, []);

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  // Handle Input Change
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'signup') {
      setSignupData({ ...signupData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();

      if (response.ok && data.success !== false) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Signup successful! Please check your email to verify your account.',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        setSignupData({ name: '', email: '', password: '' }); // Clear form
        setIsRightPanelActive(false); // Switch to login panel
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: data.message || 'Signup failed.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error signing up. Try again.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok && data.success !== false) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        localStorage.setItem('token', data.token);

        // Retrieve stored URL or default to home
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin'); // Clear after use

        loginTimeoutRef.current = setTimeout(() => {
          window.location.href = redirectUrl; // Redirect to the stored URL
        }, 1000); // Give user time to see the success message
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: data.message || 'Login failed.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error logging in. Try again.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="auth-body">
      <div
        className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}
        id="container"
      >
        {/* Sign Up Container */}
        <div className="auth-form-container sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <div className="infield">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signupData.name}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div className="infield">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div className="infield">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <button className="ghostBtn" type="submit">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Container */}
        <div className="auth-form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <div className="infield">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => handleChange(e, 'login')}
                required
              />
            </div>
            <div className="infield">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleChange(e, 'login')}
                required
              />
            </div>
            <span
              className="forgot"
              onClick={() => navigate('/forgot-password')}
              style={{ cursor: 'pointer', marginTop: '10px' }}
            >
              Forgot your password?
            </span>
            <button className="ghostBtn" type="submit">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="animated-bg"></div>
            <div className="floating-elements">
              <div>🍃</div>
              <div>🍃</div>
              <div>🍃</div>
              <div>🍃</div>
              <div>🍃</div>
            </div>
            <div className="overlay-panel overlay-left">
              <h1>Reduce</h1>
              <p>Join us in making the world greener. Login to track</p>
              <button className="ghost" onClick={togglePanel}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Start</h1>
              <p>Sign up and calculate your carbon impact to help make a difference.</p>
              <button className="ghost" onClick={togglePanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
