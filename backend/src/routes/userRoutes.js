const express=require('express');
const router=express.Router();

const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
}=require('../middleware/authMiddleware');

const {protect}=require('../middleware/authMiddleware');

router.post('/login',authUser);
router.post('/register',registerUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

module.exports=router;