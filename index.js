const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("./config/Passport");
require("dotenv").config();

const authRouter = require("./routes/Auth");
const menuRouter = require("./routes/Menu");
const resturantRouter = require("./routes/Resturants");


const server = express();

server.use(cors());
server.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(bodyParser.json());
server.use(cookieParser());

server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate("session"));

server.use("/auth", authRouter.router);
server.use("/", menuRouter.router);
server.use("/", resturantRouter.router);


server.listen(process.env.PORT, () => {
  console.log(`the server is started at ${process.env.PORT} port`);
});

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

main();

server.get("/", (req, res) => {
  res.json({ status: "success" });
});
