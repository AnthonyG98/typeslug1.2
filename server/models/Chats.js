module.exports = (sequelize, DataTypes) =>{
       const Chats = sequelize.define("Chats", {
                     messages: {
                            type: DataTypes.STRING, 
                            allowNull: true
                     },
                     sender_id: {
                            type: DataTypes.INTEGER,
                     },
                     sender_username:{
                            type: DataTypes.STRING,
                            allowNull: true
                     },
                     chat_id:{
                            type: DataTypes.STRING,
                            allowNull: true
                     }
              })
              
              return Chats
       }