const {DataTypes, EmptyResultError}=require('sequelize');
const {sequelize}=require('../config/db');
const bcrypt=require('bcryptjs');

const User=sequelize.define('User',{
    id:{
        type:DataTypes.UUID,//Universally Unique Identifier 128-bit number
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
},{
    tableName:'users',//Explicity define table name
    timestamps:true,//Adds createdAt and updatedAt fields
}
)
//Hash password before saving
User.beforeCreate(async(user)=>{
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt)
})

//Compare entered password with hashed password

User.prototype.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
module.exports=User;