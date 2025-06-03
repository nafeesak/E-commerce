const asyncHandler=require('express-async-handler');
const Product=require('../models/Product');
const User=require('../models/User');//Import User model for association include

//@desc Fetch all products
//@route GET /api/products
//@access Public

const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.findAll();
    res.json(products);
});

//@desc Fetch single products
//@route GET /api/products/:id
//@access Public

const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findByPk(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found')
    }   
});


//@desc Create products
//@route POST /api/products
//@access Private/Admin

const createProduct=asyncHandler(async(req,res)=>{
    //For simplicity we assign a default product created by an admin (req.user.id)
    //In real app,form data for new product would come from frontend
    const {name,price,description,image,brand,category,countInStock}=req.body;
    const product=await Product.create({
        name:name||'Sample name',
        price:price||0,
        user_id:req.user.id,//ID of the admin creating the products
        image:image||'/images/sample.jpg',
        brand:brand ||'Sample Brand',
        category:category||'Sample Category',
        countInStock:countInStock||0,
        description:description||'Sample description',
    }); 
    res.status(201).json(product)
});
//@desc Update a product
//@route PUT /api/products/:id
//@access Private/Admin

const updatedProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body;
    const product=await Product.findByPk(req.params.id);
    if(product){
        product.name=name||product.name;
        product.price=price ||product.price;
        product.description=description||product.description;
        product.image=image||product.image;
        product.brand=brand||product.brand;
        product.category=category||product.category;
        product.countInStock=countInStock!==undefined?countInStock:product.countInStock;

        const updatedProduct=await product.save();
        res.json(updatedProduct);
    }else{
        res.status(404);
        throw new Error('Product not found')
    }
})

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin

const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findByPk(req.params.id);

    if(product){
        await product.destroy();
        res.json({message:'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});


module.exports={
    getProducts,
    getProductById,
    createProduct,
    updatedProduct,
    deleteProduct,
}