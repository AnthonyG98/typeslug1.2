import React from 'react'
import typewriter from "../images/typewriterone.png"
function Chat(props) {
       return (
              <>
              <div className="chats-container" onClick={props.openChat} id={props.id}>
                     <div className="chat-img-container">
                            <img className="chat-img" src={typewriter} alt=""/>
                            <p className="chat-user">{props.username}</p>
                     </div>
                     <div className="chat-text-container">
                            <p className="chat-text">{props.text}</p>
                     </div>
              </div>
              </>
              
       )
}

export default Chat
