import React from 'react'


function MessagesProps(props) {
       return (
              <div className="message-prop-container">
                     <h1 className="from-username">{props.from}</h1>
                     <p className="msg-text">{props.msgText}</p>
              </div>
       )
}

export default MessagesProps
