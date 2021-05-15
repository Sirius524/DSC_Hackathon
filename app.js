// const fs = require('fs');
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const app = express();

app.use(cors())
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
// 3) Route

const certificateRouter = require("./routes/certificateRoutes");
const userRouter = require("./routes/userRoutes");
const msgRouter = require("./routes/msgRoutes");

app.use("/api/certificate", certificateRouter);
app.use("/api", userRouter);
app.use("/api/blogs", msgRouter);

module.exports = app;
