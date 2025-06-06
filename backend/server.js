const app=require('./src/app');
const {connectDB}=require('./src/config/db');
const {syncDatabase}=require('./src/models');//Import syncDatabase function
require('dotenv').config();

const PORT=process.env.PORT||5000;

//connect to database
connectDB();

//Sync database models
//IMPORTANT: In production, use SEquelize migration instead of sync
// syncDatabase({force:true})
// syncDatabase();

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
