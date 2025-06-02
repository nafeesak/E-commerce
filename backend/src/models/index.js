//Associations and Sync
//This file will define assocaites between your models and sync them with the database.

const {sequelize}=require('../config/db');
const User=require('./User');
const Product=require('./Product');

User.hasMany(Product,{foreignKey:'user_id'});
Product.belongsTo(User,{foreignKey:'user_id'});

const syncDatabase=async()=>{
    try{
        //alter:true //will update the table schema without dropping if it changes are detected.
        //Use `force:true` ONLY IN DEVELOPMENT to drop and recreate tables on every restart.
        await sequelize.sync({alter:true});
        console.log('Databse Syned successfully');
    }catch(err){
        console.log('Error syncing database:',err)
    }

};
module.exports={
    sequelize,User,Product,syncDatabase
}
