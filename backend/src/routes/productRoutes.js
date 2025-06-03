const express=require('express');
const router=express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updatedProduct,
    deleteProduct,
} = require('../controllers/productController')

const {protect,admin}=require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect,admin,createProduct);

router
.route('/:id')
.get(getProductById)
.put(protect,admin,updatedProduct)
.delete(protect,admin,deleteProduct);

module.exports=router;