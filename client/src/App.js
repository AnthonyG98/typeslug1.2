import './App.css';
import {
       BrowserRouter as Router,
       Routes,
       Switch,
       Route,
       Link, Navigate
     } from "react-router-dom";
import "./responsive.css"
import { useState } from "react"
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
import Messages from "./components/Messages"
import Search from './components/Search';
import Messageuser from './components/Messageuser';
function App() {
       const [isAuth, setIsAuth] = useState(false)
       let username;
       return (
              <>
              <Router>
                     <Routes>
                            <Route path="/"  element={<Login/>} />
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/messages" element={<Messages />}/>
                            <Route path="/search" element={<Search />}/>
                            <Route path={`/message`} element={<Messageuser/>}/>

                     </Routes>
              </Router>
              </>
       );
}

export default App;
