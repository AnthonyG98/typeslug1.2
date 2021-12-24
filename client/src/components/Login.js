import React, { useState } from 'react'
import {
       BrowserRouter as Router,
       Routes,
       Switch,
       Route,
       Link,
       Navigate
     } from "react-router-dom";
import typewriter from "../images/typewriterone.png"
import axios from "axios"


function Login() {
       const [username, setUsername] = useState();
       const [password, setPassword] = useState();
       const [isAuth, setIsAuth] = useState(false);

       const onLogin = async() =>{
              try{
                     const data = {
                            username: username,
                            password: password
                     }
                     const res = await axios.post("http://localhost:3001/users/login", data)
                     console.log(res)
                     localStorage.setItem("username", username)
                     setIsAuth(true)
              } 
              catch (err){
                     console.log(err)
              }
       }
       return (
              <>
              <div className="login">
              <div className="login-container">
                     <div className="img-container">
                            <img src={typewriter} alt="typewriter" className="login-img"/>
                     </div>
                     <div className="login-form-container">
                            <label>Username</label>
                            <input type="text"
                            onChange={(e)=>{
                                   setUsername(e.target.value)
                            }}
                            />
                            <label>Password</label>
                            <input type="password"
                            onChange={(e)=>{
                                   setPassword(e.target.value)
                            }}
                            />
                            <button className="login-btn" onClick={()=>{onLogin()}}>Login</button>
                            <p className="sign-text">Are you a new user? Sign up <Link to="/signup" className="sign-link">here</Link></p>
                     </div>
              </div>
       </div>
              {isAuth ? <Navigate to={`/messages`}/> : ""}
              
       </>
       )
}

export default Login
