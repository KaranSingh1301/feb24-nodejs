const express = require("express");
const clc = require("cli-color");
require("dotenv").config();
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

//file-imports
const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");
const BlogRouter = require("./Controllers/BlogController");
const { isAuth } = require("./Middlewares/AuthMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;
const store = new mongoDbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

//middleware
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: "BlogServer is running",
  });
});

// /auth/register POST
// /blog/create-blog POST
app.use("/auth", AuthRouter);
app.use("/blog", isAuth, BlogRouter);

app.listen(PORT, () => {
  console.log(clc.yellowBright(`Server is running on PORT:${PORT}`));
});

//https://docs.google.com/document/d/1PIuTHTJwMezvKWnNLZNntnkjMj35FuKbOfGNaRVcRD0/edit?usp=sharing
