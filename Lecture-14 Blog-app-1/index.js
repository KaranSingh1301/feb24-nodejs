const express = require("express");
const clc = require("cli-color");
require("dotenv").config();

//file-imports
const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: "BlogServer is running",
  });
});

// /auth/register POST
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(clc.yellowBright(`Server is running on PORT:${PORT}`));
});
