import React from 'react'
import typewriter from "../images/typewriterone.png"
function Results(props) {
       return (
              <div className="results">
                     <img src={typewriter} alt="" className="results-img"/>
                     <h1 className="username-results">{props.username}</h1>          
              </div>

       )
}

export default Results
