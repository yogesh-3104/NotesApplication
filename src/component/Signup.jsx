import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const handleSignup=async(e)=>{
    try {
        e.preventDefault();
        const response=await axios.post('http://localhost:8080/auth/register',{
          name,email,password,phoneNumber
        });
        if(response){
          localStorage.setItem("NoteUser",response.data.token)
          navigate('/');
          console.log(response);
        }
        
    } catch (error) {
        console.log("Error: ",error)
    }
  }
   const googleAuth = () => {
     console.log("hello");
     //  window.location.href = "http://localhost:8080/auth/google";
     window.open(`http://localhost:8080/auth/google`, "_self");
   };
   const logoutHandler = async () => {
     console.log("logout");
     window.open(`http://localhost:8080/auth/logout`, "_self");
     // await axios.get("http://localhost:8080/auth/logout");
   };
  return (
    <div>
      <div className="container">
        <form className="login-form" onSubmit={handleSignup}>
          <h2>Signup</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="phoneNumber">Mobile Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <p>OR</p>
        <button onClick={googleAuth}>Sign in with Google</button>
        <button onClick={logoutHandler}>logout</button>
        <div>
            <span>Already hava an account?<a href="/login">Login</a></span>
        </div>
        <p className="footer-text">
          &copy;2024 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Signup