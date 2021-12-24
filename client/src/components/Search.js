import React, { useState } from 'react'
import typewriter from "../images/typewriterone.png"
import { Link } from 'react-router-dom'
import axios from 'axios';
import Results from './Results';
function Search() {
       const [results, setResults] = useState();
       const [search, setSearch] = useState();
       const [err, setErr] = useState("");
       const [username, setUsername] = useState();
       const [firstName, setFirstName] = useState();
       const [msgBtn, setMsgBtn] = useState(false);
       const searchUser = async(e) =>{
              const res = await axios.get(`http://localhost:3001/users/${e}`);
              console.log(res)
              if(res.data == null){
                     setErr("No users with that name")
                     setUsername("")
                     setFirstName("")
                     setMsgBtn(false)
              } else {
                     setResults(
                            setErr(""),
                            setUsername(res.data.username),
                            setFirstName(res.data.firstName),
                            setMsgBtn(true)

                     )
              }
              
       }
       return (
              <>
              <div className="nav-container">
              <img className="profile-pic" src={typewriter}/>
                     <Link className="dash-link" to="/profile">View Profile</Link>
                     <Link className="dash-link" to="/messages">View Messages</Link> 
                     <Link className="dash-link" to="/dashboard">Dashboard</Link> 
                     <Link to="/search"><i class="fas fa-search"></i></Link>                                   

              </div>
              <div className="search-container">
                     <i class="fas fa-search" id="two"></i>
                     <input 
                     type="text" 
                     id="search-two" 
                     placeholder="search for user"
                     onChange={(e)=>{
                            searchUser(e.target.value)
                     }}
                     />
              </div>
              <div className="results-container">
                            <p className="err">{err}</p>
                            <Results username={username} firstName={firstName}/>
                            {
                                   msgBtn ? <Link to="/message">Message</Link> : ""
                            }
                            
              </div>
              
              </>
       )
}

export default Search
