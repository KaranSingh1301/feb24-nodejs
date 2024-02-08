const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log(req);

  return res.send("Server is running");
});

app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
