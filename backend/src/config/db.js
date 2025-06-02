const {Sequelize} =require('sequelize');
require('dotenv').config();

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect:'mysql',
        logging:false,//set to true to see SQL queries in console
    }
);

const connectDB=async()=>{
    try{
        await sequelize.authenticate();
        console.log("MYSQL connected sucessfully with sequlizer");
    }catch(err){
        console.error('Unable to connect to the database:',err)
        process.exit(1);//Exit with failure
    }
}
module.exports={sequelize,connectDB}