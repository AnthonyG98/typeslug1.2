//for messaging pther users
const getAllMessages = async () =>{
       axios.get(`http://localhost:3001/users/${localStorage.getItem("username")}`).then(response =>{
              setId(response.data.id)
       axios.get(`http://localhost:3001/users/message/${localStorage.getItem("username")}`).then(response=>{
                     console.log(response)
                     axios.get(`http://localhost:3001/users/chats/${id}`).then(response =>{
                            console.log(response)
                            setAllMsgs(
                                   response.data.map(allMessages =>{
                                          return <MessagesProps msgText={allMessages.messages}/>
                                   })
                            )
                     
                     })
              })
       })
}

const sendUserNewMsg = () =>{
      setUserNewMsg(true);
}
const sendMsg = async() =>{
       const sendData = {
              to: username,
              from: localStorage.getItem("username")
       }
       axios.get(`http://localhost:3001/users/${localStorage.getItem("username")}`).then(response =>{
              setMyId(response.data.id)
       })
       axios.post(`http://localhost:3001/users/message/${username}`, sendData).then(response =>{
              console.log(response)
              const msgData = {
                     messages: messages,
                     myId: myId
              }
              axios.post(`http://localhost:3001/users/chats/${id}`, msgData).then(response =>{
                     console.log(response)
                     setAllMsgs (
                            // response.data.map(allMessages =>{
                            //        return <MessagesProps msgText={allMessages.messages}/>
                            // })
                     )
              })
       })
       getAllMessages();
}
useEffect(async() => {
       try {
              getAllMessages();            
       } catch( err ){
              console.log(err)
       }
}, [])