import React from 'react'
import typewriter from "../images/typewriterone.png"
function ChatReceived(props) {
       return (
              <>
              <button onClick={props.send} className='chat-btn'>Send</button>
              <textarea onChange={props.message} className='chat-textarea'></textarea>
              </>
              
       )
}

export default ChatReceived
