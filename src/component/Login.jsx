import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate ();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      if(response){
        
        console.log("Login success:", response);
        localStorage.setItem("NoteUser", JSON.stringify(response.data.token));
        navigate('/');
      }
      
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };
 
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
        {/* <div className="form-group checkbox">
          <input type="checkbox" id="remember_me" />
          <label htmlFor="remember_me">Remember Me</label>
        </div> */}
        <button type="submit">Login</button>
      </form>
      <div>
        <span>
          Create an account?<a href="/signup">Signup</a>
        </span>
      </div>
      <p className="footer-text">&copy;2024 Acme Corp. All rights reserved.</p>
    </div>
  );
};

export default Login;
