const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../models/User');

const protect=asyncHandler(async(req,res)=>{
    let token;

    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token=req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            //Get user from the token and attach it to the request object
            req.user=await User.findByPk(decoded.id,{
                attributes:{exclude:['password']},//Exclude password
            });
            if(!req.user){
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            next();
        }catch(error){
            console.error(error);
            res.status(401);
            throw new Error('Not authorized,token failed')
            
        }
    }

        if(!token){
            res.status(401);
            throw new Error('Not authorized,no token')
        }
});

const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

module.exports={protect,admin};