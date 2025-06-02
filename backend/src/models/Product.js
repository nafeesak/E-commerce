const {DataTypes}=require('sequelize');
const {sequelize}=require('../config/db');

const Product=sequelize.define('Product',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    user_id:{//user who created the product (for admin panel)
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'users',//Refer to table name
            key:'id',
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    brand:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,//For simplicity now,later we can link to categoty model
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    rating:{
        type:DataTypes.DECIMAL(2,1),//4.5
        allowNull:false,
        defaultValue:0.0
    },
    numReviews:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    price:{
        type:DataTypes.DECIMAL(10,2),//eg 99.99
        allowNull:false,
        defaultValue:0.0
    },
    countInStock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
    },
},{
    tableName:'products',
    timestamps:true
})
module.exports=Product;