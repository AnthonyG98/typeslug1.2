import React from 'react'
import axios from 'axios'

function Messageuser() {
       const fromUser = localStorage.getItem("username");
       const sendMsg = async() => {
              axios.post(`http://localhost:3001/users/message/${fromUser}`)
       }
       return (
              <div className="msg-user-container">
                     <div className="our-msgs">

                     </div>
                     <textarea></textarea>
                     <button className="send-msg" onClick={sendMsg}>Send</button>
              </div>
       )
}

export default Messageuser
