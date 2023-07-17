const express = require('express');
const app=express();
const dotenv = require('dotenv');
dotenv.config({path:'config.env'})
const DB = require('./config/database').apply();


app.use(express.json());

//mount routes
const mountRoutes = require('./routes');
mountRoutes(app);


app.listen(3000, () => {
  console.log("server running...");
});