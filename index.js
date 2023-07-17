const express = require('express');
const app=express();
const dotenv = require('dotenv');
dotenv.config({path:'config.env'})
const DB = require('./config/database').apply();
const errorMiddleware = require("./middleware/errorMiddleware");
const ApiError = require("./utils/apiError");

app.use(express.json());

//mount routes
const mountRoutes = require('./routes');
mountRoutes(app);



app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this page ${req.url}`, 404));
});

//Global error middleware
app.use(errorMiddleware);


app.listen(3000, () => {
  console.log("server running...");
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message}`);
  app.close(() => {
    console.error("shutting down ... ");
    process.exit(1);
  });
});