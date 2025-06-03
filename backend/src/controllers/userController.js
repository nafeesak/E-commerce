const asyncHandler=require('express-async-handler');
const User=require('../models/User');
const generateToken =require('../utlis/generateToken');

//@desc Auth user & get token
//@route Post /api/users/login
//@access Public

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({where:{email}});

    if(user && (await user.matchPassword(password))){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user.id),
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});


//@desc Register a new User
//@route Post /api/users/register
//@access Public

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const userExists=await User.findOne({where:{email}});

    if(userExists){
          res.status(400);
        throw new Error('User already exists')
    }
    const user=await User.create({
        name,
        email,
        password,//password will be hashed by the User.beforeCreate hook
    });
    if(user){
         res.status(201).json({//Created
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user.id),
        })
    }else{
          res.status(401);
        throw new Error('Invalid user data')
     
    }
});

//@desc get user profile
//@route Get /api/users/profile
//@access Private

const getUserProfile=asyncHandler(async(req,res)=>{
    //req.user is set by the protect middleware
    const user=await User.findByPk(req.user.id);

    if(user){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(401);
        throw new Error('User not found')
    }
})


//@desc Update user profile
//@route PUT /api/users/profile
//@access Private


const updateUserProfile=asyncHandler(async(req,res)=>{
    //req.user is set by the protect middleware
    const user=await User.findByPk(req.user.id);

    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;

        if(req.body.password){
            //The user.beforeUpdate hook(if you add one)or manually hash here
            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(req.body.password,salt)
        }
        const updatedUser=await user.save();
         res.json({
            id:updatedUser.id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser.id),
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }
})
module.exports={authUser,registerUser,getUserProfile,updateUserProfile};



