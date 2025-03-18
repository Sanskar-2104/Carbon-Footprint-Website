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


import React, { useState } from "react";
import "./LoginSignup.css";

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  return (
    <div className="auth-body">
      <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      {/* Sign Up Container */}
      <div className="auth-form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <div className="infield">
            <input type="text" placeholder="Name" />
          </div>
          <div className="infield">
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div className="infield">
            <input type="password" placeholder="Password" />
          </div>
          <button className="ghostBtn" type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Container */}
      <div className="auth-form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <div className="infield">
            <input className="auth-input" type="email" placeholder="Email" name="email" />
          </div>
          <div className="infield">
            <input type="password" placeholder="Password" />
          </div>
          <a href="#" className="forgot">Forgot your password?</a>
          <button className="ghostBtn" type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay Container */}
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
            <button className="ghost" onClick={togglePanel}>Sign In</button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>Start</h1>
            <p>Sign up and calculate your carbon impact to help make a difference.</p>
            <button className="ghost" onClick={togglePanel}>Sign Up</button>
          </div>
        </div>
        <button id="overlayBtn" onClick={togglePanel}></button>
      </div>
    </div>
    </div>
  );
};

export default AuthPage;
