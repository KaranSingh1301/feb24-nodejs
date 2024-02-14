const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const clc = require("cli-color");

//file-import
const { userDataValidation } = require("./utils/authUtil");
const userModel = require("./models/userModel");

//constants
const app = express();
const PORT = process.env.PORT;

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(clc.yellowBright.bold("MongoDb connected successfully"));
  })
  .catch((err) => {
    console.log(clc.redBright(err));
  });

//api
app.get("/", (req, res) => {
  return res.send("Todo App server is running");
});

app.get("/register", (req, res) => {
  return res.render("registerPage");
});

app.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;

  //data validation
  try {
    await userDataValidation({ name, password, email, username });
  } catch (error) {
    return res.send({
      status: 400,
      message: "user data error",
      error: error,
    });
  }

  //check if email and username already exist or not
  //store the data in Db
  const userObj = new userModel({
    //schema : client
    name: name,
    email: email,
    username: username,
    password: password,
  });

  try {
    const userDb = await userObj.save();
    return res.send({
      status: 201,
      message: "Registeration successfull",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

app.get("/login", (req, res) => {
  return res.render("loginPage");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  return res.send("Login successfull");
});

app.listen(PORT, () => {
  console.log(clc.yellowBright("Server is running"));
  console.log(clc.yellowBright.underline.bold(`http://localhost:${PORT}`));
});
