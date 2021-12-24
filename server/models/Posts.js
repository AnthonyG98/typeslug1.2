module.exports = (sequelize, DataTypes) =>{
       const Posts = sequelize.define("Posts", {
                     id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true 
                     },
                     post: {
                            type: DataTypes.STRING, 
                            allowNull: false
                     }
              })
              return Posts
       }