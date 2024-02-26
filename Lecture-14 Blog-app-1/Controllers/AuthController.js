const express = require("express");
const AuthRouter = express.Router();

AuthRouter.post("/register", (req, res) => {
  return res.send("Working register");
});

AuthRouter.post("/login", (req, res) => {
  return res.send("Working login");
});

module.exports = AuthRouter;
