import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      console.log("Login success:", response);
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };
  const googleAuth = () => {
    console.log("hello");
     window.location.href = "http://localhost:8080/auth/google";
    // window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };
  const logoutHandler=async()=>{
    console.log("logout")
    window.open(`http://localhost:8080/auth/logout`,"_self");
    // await axios.get("http://localhost:8080/auth/logout");
  }
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" id="remember_me" />
          <label htmlFor="remember_me">Remember Me</label>
        </div>
        <button type="button">Login</button>
      </form>
        <p>OR</p>
        <button onClick={googleAuth}>Sign in with Google</button>
        <button onClick={logoutHandler}>logout</button>
      <p className="footer-text">&copy;2024 Acme Corp. All rights reserved.</p>
    </div>
  );
};

export default Login;
