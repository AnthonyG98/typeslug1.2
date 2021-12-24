import React from 'react'
import typewriter from "../images/typewriterone.png"
function ChatLog(props) {
       return (
              <div className='chatlog-container'>
                     <div>
                            <div className='from-container'>
                                   <img className="chat-img" src={typewriter} alt=""/>
                                   <p className='from'>{props.from}</p>
                            </div>
                            <div className='to-container'>
                                   <p className='to'>{props.me}</p>
                            </div>
                            <p>{props.message}</p>
                     </div>
                     
              </div>
       )
}

export default ChatLog
