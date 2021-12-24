module.exports = (sequelize, DataTypes)=>{
       const Users = sequelize.define("Users", {
              firstName: {
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              lastName:{
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              username:{
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              profilePicture:{
                     type: DataTypes.STRING,
                     allowNull: true,
              },
              password:{
                     type: DataTypes.STRING,
                     allowNull: false
              }          
       })
       Users.associate = (models) =>{
              Users.hasMany(models.Posts)
       }
       Users.associate = (models) =>{
              Users.hasMany(models.Messages)
              Users.hasMany(models.Chats)
       }
       // Users.associate = (models) =>{
       //        Users.hasMany(models.Chats)
       // }
          
       return Users
}