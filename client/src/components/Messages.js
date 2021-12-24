import React, { useState, useEffect } from 'react'
import MessagesProps from './MessagesProps'
import typewriter from "../images/typewriterone.png"
import { Link } from 'react-router-dom'
import axios from "axios"
import Results from './Results'
import Chat from './Chat'
import ChatLog from './ChatLog'
import ChatReceived from './ChatReceived'

function Messages() {
       
       const [ userNewMsg, setUserNewMsg] = useState(false)
       const [chatBtn, setChatBtn] = useState();
       const [results, setResults] = useState();
       const [search, setSearch] = useState();
       const [id, setId] = useState();
       const [ myId, setMyId ] = useState();
       const [err, setErr] = useState("");
       const [username, setUsername] = useState();
       const [firstName, setFirstName] = useState();
       const [ from, setFrom ] = useState();
       const [msgBtn, setMsgBtn] = useState(false);
       const [messages, setMessages] = useState();
       const [ChatMessages, setChatMessages] = useState();

       //chat data
       const [ chatUsername, setChatUsername ] = useState();
       const [ chatId, setChatId ] = useState();
       const [ chatSenderId, setChatSenderId ] = useState();
       const [chatIdHash, setChatIdHash] = useState();


       const [chat, setChat] = useState();
       const [chatReceived, setChatReceived] = useState();
       const [ chatLog, setChatLog ] = useState();
       const [myChatMsgs, setMyChatMsgs] = useState()
       const [resultInbox, setResultInbox] = useState();
       
       let myUsername = localStorage.getItem("username")
       
       const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       function generateString(length) {
              setUserNewMsg(true)
              let result = '';
              const charactersLength = characters.length;
              for ( let i = 0; i < length; i++ ) {
                     result += characters.charAt(Math.floor(Math.random() * charactersLength));
              }
              axios.get(`http://localhost:3001/users/${username}`).then(response =>{
                     setFrom(response.data.username)
                     setId(response.data.id)
                     console.log(response.data)
                     // openChat(result)
              })
              return setResultInbox(result);
       }
       
       const openChat = (e) =>{
              axios.get(`http://localhost:3001/users/chat/${e}`).then(response =>{
                     console.log(response)
                     const scroll = () =>{
                            const messageBody = document.getElementById('messageBody');
                            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
                            console.log("scroll")
                     }     
                     setChatIdHash(e)
                     const mapChatLog = response.data.map(logUser =>{
                            return logUser
                     })
                     const mapChatLogMessage = response.data.map(logMessage =>{
                            return console.log(logMessage.messages)
                     })
                     const mapChatLogId = response.data.map(logId =>{
                            return logId.sender_id
                     })
                     setChatSenderId(mapChatLogId)
                     setChatBtn(true)
                     if(chatBtn){
                            scroll();
                     }
                     setChatLog(
                            mapChatLog.map(allData =>{
                                   return <ChatLog 
                                   from={allData.sender_username} 
                                   message={allData.messages}/>
                            })
                     )
              }) 
       }
       const sendChat = () =>{
              const chatMsgData = {
                     from: myUsername,
                     inbox_id: chatIdHash,
                     sender_id: chatSenderId,
                     last_message: messages,
                     my_id: myId
              }
              console.log(chatSenderId)
                     axios.post(`http://localhost:3001/users/chat`, chatMsgData).then(response =>{
                            openChat(chatIdHash)       
                            console.log(response)
                                   axios.get(`http://localhost:3001/users/chat/${chatIdHash}`).then(response =>{
                                          console.log(response)
                                          const scroll = () =>{
                                                 const messageBody = document.getElementById('messageBody');
                                                 messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
                                                 console.log("scroll")
                                          }     
                                          scroll();
                                   })
              })
       }
       useEffect(async()=>{
              try { 
                     console.log("renders")
                     // getMessages();
                     axios.get(`http://localhost:3001/users/${myUsername}`).then(response =>{
                            console.log(response)
                            if ( response.data === null){
                                   getNewUserInfo();
                            } else {
                                   setMyId(response.data.id)
                            }
                            console.log(response)

                            axios.get(`http://localhost:3001/users/inbox/${myId}}`).then(response =>{
                                   const mapAllChats = response.data.allChats.map(allChat =>{
                                          return allChat
                                   })
                                   const mapAllChatsReceived = response.data.allChatsReceived.map(allChat =>{
                                          return allChat
                                   })
                                   const mapAllInboxes= response.data.allInboxes.map(allInbox =>{
                                          return allInbox
                                   })
                                   const mapAllInboxesReceived= response.data.allInboxesReceived.map(allInbox =>{
                                          return allInbox
                                   })
                                   console.log(response)
                                  setChat(
                                          mapAllInboxes.map(all =>{
                                                 return (
                                                        <Chat 
                                                        text={all.last_message} 
                                                        username={all.sender_username} 
                                                        id={all.inbox_id}
                                                        openChat={(e)=>{
                                                               openChat(all.inbox_id)
                                                        }}
                                                        />
                                                 )
                                          })                                          
                                  )
                                  setChatReceived(
                                          mapAllInboxesReceived.map(all =>{
                                                 return (
                                                        <Chat 
                                                        text={all.last_message} 
                                                        username={all.sender_username} 
                                                        id={all.inbox_id}
                                                        openChat={()=>{
                                                               openChat(all.inbox_id)
                                                        }}
                                                        />
                                                        
                                                 )
                                          })
                                  )
                            })
                     })
              } catch( err ){
                     console.log(err)
              }
       }, [myId, chatLog]);
       
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
                            setMsgBtn(true),
                     )
              }
              
       }
       const sendMessage = ()=>{
              const messageData = {
                     inbox_id:resultInbox,
                     last_message: messages,
                     from: myUsername,
                     id: id,
                     my_id: myId
              }
              axios.post(`http://localhost:3001/users/message/`, messageData).then(response =>{
                      console.log(response)
              })              
                     axios.post(`http://localhost:3001/users/chat`, messageData).then(response =>{
                            console.log(response)
                     }) 
       }
       const getNewUserInfo = ()=>{
              axios.get(`http://localhost:3001/users/${myUsername}`).then(response =>{
                     console.log(response);
                     const newUserModal = document.querySelector(".new-user-container");
                     newUserModal.style.display = "none";    
                     if ( response.data === null){
                            getNewUserInfo();
                     } else {
                            setMyId(response.data.id)
                     }
              })
       }
       
       return (
              <>
              <div className="new-user-container">
                     <div className="welcome-container">
                            <p className="welcome-text">Welcome to Typeslug,
                            a simple app to share with your friends! Post on your dashboard or 
                            message a friend. 
                            </p>
                            <button className="welcome-btn" onClick={()=>{getNewUserInfo()}}>Okay</button>
                     </div>
              </div>
              <div className="nav-container">
              <img className="profile-pic" src={typewriter}/>
                     {/* <Link className="dash-link" to="/profile">View Profile</Link>
                     <Link className="dash-link" to="/messages">View Messages</Link> 
                     <Link className="dash-link" to="/dashboard">Dashboard</Link> 
                     <Link to="/search"><i class="fas fa-search"></i></Link>                                 */}
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
              {
                     msgBtn ? 
                     <div className="results-container">
                            <button className="msg-btn"onClick={()=>{generateString(10)}}>Message</button>
                     </div>
                     : <p className="err"></p>
              }
              <div className="dash-and-links">
                     <div className="dash-links">
                            
                     </div>
                     <div className="props">
                            <h1></h1>
                            
                     </div>
              </div>
              
              {      userNewMsg ? 
                     <div className="chat-container">
                            <div className="chats">

                            </div>
                            <div className="chatbox-container">
                            <textarea 
                                   className="chatbox"
                                   onChange={e =>{
                                          setMessages(e.target.value)
                            }}></textarea>
                            <button className="msg-btn" onClick={sendMessage}>Send</button>
                            </div>
                     </div>
                     : ""
              }
              <h1 onClick={()=>{

              }}>{myChatMsgs}</h1>
              <div className='states'>
                     <div className='state'>
                            {chatReceived}
                            {chat}
                     </div>
                     <div className='div'>
                     <div className='chat-overflow' id="messageBody">
                            {chatLog}
                     </div>
                     <div  className='statess'>
                            
                            { chatBtn ? <ChatReceived 
                            message={(e)=>{
                                   setMessages(e.target.value)
                            }}
                            send={()=>{
                                   sendChat()
                            }}
                            /> : "" }
                     </div>
                     </div>
              </div>
       </>
       )
}

export default Messages
