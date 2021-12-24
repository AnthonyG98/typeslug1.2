const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { Users, Messages, Chats } = require("../models");

router.get("/:username", async(req, res)=>{
       const username = req.params.username
       const findUser = await Users.findOne({where:{username: username}});
       res.json(findUser)
})
router.put("/:username", async (req, res) => {
       const username = req.params.username;
       const userId = await Users.findOne({where:{username: username}});

       const profilePicture = req.body.profilePicture; 
       userId.profilePicture = profilePicture;
       // pieceId.pieceTitle = pieceTitle;
       // pieceId.pieceText = pieceText;

       await userId.save();
       res.json(req.body.profilePicture);
      })
router.post("/", async(req, res)=>{
       const {firstName, lastName, username, password} = req.body;
       // const createUser = await Users.create({
       //        firstName: firstName,
       //        lastName: lastName,
       //        username: username,
       //        password: password
       // })
       bcrypt.hash(password, 10).then((hash)=>{
              Users.create({
                     firstName: firstName,
                     lastName: lastName,
                     username: username,
                     password: hash
              })
       })
       res.json(username)
})
router.get("/dashboard/:username", async(req, res)=>{
       const username = req.params.username;
       const users = await Users.findOne({where:{username: username}});
       res.json(users)
})
router.post("/login", async(req, res)=>{
       const { username, password } = req.body;
       const user = await Users.findOne({ where: { username:username } });
       if(!user) {
              res.json({error: "user does not exist"});
       } else {
              bcrypt.compare(password, user.password).then((match)=>{
                     if(!match) {
                            res.json({error: "Wrong username or password"})     
                     } else {
                            res.json(user)
                     }
              })
       }
});
//for messaging 

// router.post("/message/:username", async(req, res)=>{
//        const { sendTo } = req.params.username;
//        const msgTo = req.body.to;
//        const msgFrom = req.body.from;
//        const sendingTo = await Users.findOne({where:{username: msgTo}});
//        // const idForChats = await Chats.findOne({where: })

//        Messages.create({    
//               to: msgTo,
//               from: msgFrom,
//               UserId: sendingTo.id
//        })
//        res.json(sendingTo);
// })
// router.get("/message/:username", async(req, res)=>{
//        const { usersMsgs } = req.params.username;
//        const allMsgs = await Messages.findAll({where:{from: req.params.username}});
//        // const id = await Messages.findOne({where:{ username: username }})
//        // const userId = await Messages.findAll({where:{ UserId: id}})
//        res.json(allMsgs)

// })

// router.post("/chats/:id", async(req, res)=>{
//        const msgId = req.params.id
//        const msgs = req.body.messages
//        const myId = req.body.myId
//        // const id = await Users.findOne({where:{id: id}})

//        Chats.create({    
//               messages: msgs,
//               MessageId: msgId, 
//               myId: myId    
//        })
//        res.json();
// })
router.get("/chat/:chatId", async (req, res)=>{
       const myChatId = req.params.chatId;
       const allChatMsgs = await Chats.findAll({where:{chat_id:myChatId}});
       res.json(allChatMsgs);
})

router.post("/message/", async(req, res)=>{
       const inboxId = req.body.inbox_id;
       const lastMessage= req.body.last_message;
       const senderUsername= req.body.from;
       const senderId = req.body.id;
       const userId = req.body.my_id;

       Messages.create({
              sender_username: senderUsername,
              sender_id: senderId,
              inbox_id: inboxId,
              last_message: lastMessage,
              UserId: userId
       })
       res.json(userId)
       
})
router.get("/inbox/:myId", async(req, res)=>{
       const sentId = req.params.myId
       const sent = req.body.sent
       // const receivedId = req.body.received
       const allInboxes = await Messages.findAll({where:{UserId: sentId}});
       const allInboxesReceived = await Messages.findAll({where:{sender_id: sentId}});
       const allChats = await Chats.findAll({where:{UserId: sentId}});
       const allChatsReceived = await Chats.findAll({where:{sender_id: sentId}});
       
       res.json({allInboxes, allChats, allInboxesReceived, allChatsReceived})
})
// router.get("/received/:myId", async(req, res)=>{
//        const receivedId = req.params.myId
//        const allInboxes = await Messages.findAll({where:{sender_id: receivedId}})

//        res.json(allInboxes)
// })
router.post("/chat/", async(req, res)=>{
       const inboxId = req.body.inbox_id;
       const lastMessage= req.body.last_message;
       const senderUsername= req.body.from;
       const senderId = req.body.id;
       const userId = req.body.my_id;

       Chats.create({
              sender_username: senderUsername,
              sender_id: senderId,
              chat_id: inboxId,
              messages: lastMessage,
              UserId: userId
       })
       res.json(userId)
       
})
router.get("/chat/:chatId", async (req, res)=>{
       const inboxId = req.params.chatId;
       const openInbox = await Chats.findAll({where:{chat_id: inboxId}})
       res.json(openInbox)
})
router.post("/chats/:chatId", async (req, res)=>{
       const inboxId = req.params.chatId;
       const message = req.body.messages
       const fromId = req.body.fromId
       const fromUsername = req.body.fromUser
       Chats.create({
              messages: message,
              sender_id: fromId,
              sender_username: fromUsername,
              chat_id: inboxId
       })
       res.json(message)
})
module.exports = router;