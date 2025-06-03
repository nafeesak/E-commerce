const express=require('express');

const morgan=require('morgan')//for logging http request
const cors= require('cors') // for cross-orgin requests from front-end

const userRoutes=require('./routes/userRoutes')
