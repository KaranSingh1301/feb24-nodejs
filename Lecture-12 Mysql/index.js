const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

//mysql connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Karan@130101",
  database: "tododb",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) console.log(err);
  //   db.query("CREATE DATABASE mydb", function (err, result) {
  //     if (err) throw err;
  //     console.log("Database created");
  //   });
  console.log("Mysql db has been connected");
});

app.get("/", (req, res) => {
  return res.send("Nodejs server with mysql is running");
});

app.get("/get-users", (req, res) => {
  db.query("SELECT * FROM user", {}, (err, users) => {
    console.log(users);
    if (err) {
      return res.send({
        status: 500,
        error: err,
      });
    }
    return res.send({
      status: 200,
      data: users,
    });
  });
});

app.post("/create-user", (req, res) => {
  console.log(req.body);
  const { user_id, email, name, password } = req.body;

  db.query(
    "INSERT INTO user (user_id, name, email, password) VALUES (?,?,?,?)",
    [user_id, name, email, password],
    (err, data) => {
      if (err) throw err;
      return res.send({
        status: 201,
        data: data,
      });
    }
  );
});

app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
