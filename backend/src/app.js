const express=require('express');

const morgan=require('morgan')//for logging http request
const cors= require('cors') // for cross-orgin requests from front-end

const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');

const app=express();

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

//API Routes

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);

//Default route for testing

app.get('/',(req,res)=>{
    res.send('API is running...')
});

//Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports=app;