import React, { useState } from 'react'
import {
       Link, 
       Navigate
     } from "react-router-dom";
import typewriter from "../images/typewriterone.png"
import axios from "axios"

function Signup() {
       const [firstName, setFirstname] = useState();
       const [lastName, setLastname] = useState();
       const [username, setUsername] = useState();
       const [password, setPassword] = useState();
       const [isAuth, setIsAuth] = useState();


       const onSignUp = async()=>{
              try {
                     const data = {
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            password: password
                     }
                     axios.post("http://localhost:3001/users", data).then(response =>{
                            console.log(response)
                            localStorage.setItem("username", username);
                            setIsAuth(true);
                            
                     })
              }
              catch(err){
                     console.log(err)
              }
       }
       // const getNewUserInfo = async() =>{
       //        axios.get(`http://localhost:3001/users/dashboard/${username}`).then(response =>{
       //               console.log(response)
       //        })
       // }
       // if(isAuth == true){
       //        getNewUserInfo();
       // }
       return (
              <>
              <div className="login">
              <div className="login-container">
                     <div className="img-container">
                            <img src={typewriter} alt="typewriter" className="login-img"/>
                     </div>
                     <div className="login-form-container">
                            <label>First name</label>
                            <input type="text"
                            onChange={(e)=>{
                                   setFirstname(e.target.value)
                            }}
                            />
                            <label>Last name</label>
                            <input type="text"
                            onChange={(e)=>{
                                   setLastname(e.target.value)
                            }}
                            />
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
                            <button className="login-btn" onClick={()=>{onSignUp()}}>Sign Up</button>
                            <p className="sign-text">Already a user? Login <Link to="/" className="sign-link">here</Link></p>
                     </div>
              </div>
       </div>
       {isAuth ? < Navigate to="/messages"/> : ""}
       </>
       )
}

export default Signup
