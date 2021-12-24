module.exports = (sequelize, DataTypes) =>{
       const Messages = sequelize.define("Messages", {
                     id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true 
                     },
                     sender_username:{
                            type: DataTypes.STRING,
                            allowNull: true
                     },
                     sender_id: {
                            type: DataTypes.INTEGER,
                            allowNull: true
                     },
                     inbox_id: {
                            type: DataTypes.STRING,
                            allowNull: true
                     },
                     last_message:{
                            type: DataTypes.STRING,
                            allowNull: true
                     }
              })
              return Messages
       }