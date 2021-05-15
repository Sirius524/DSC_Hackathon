// const fs = require('fs');
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) Route Handlers
// 3) Rounte

const certificateRouter = require("./routes/certificateRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/certificate", certificateRouter);
app.use("/api", userRouter);

module.exports = app;
