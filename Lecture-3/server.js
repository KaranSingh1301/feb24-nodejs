//ES5
const { urlencoded } = require("body-parser");
const express = require("express");
// const { isTest, isAuth } = require("./test");
// const test1 = require("./test1");

const app = express();

//middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Server is running");
});

//query
// /api?key=value
// /api?key=100,200
app.get("/api", (req, res) => {
  console.log(req.url, " ", req.method);
  console.log(req.query);

  console.log(req.query.key.split(","));
  return res.send(`Query value: ${req.query}`);
});

// /api?key1=100&key2=200
app.get("/api1", (req, res) => {
  const key1 = req.query.key1;
  const key2 = req.query.key2;
  return res.send(`key1: ${key1} & key2=${key2}`);
});

//params
app.get("/profile/:id", (req, res) => {
  console.log(req.params);
  return res.send(`Param value: ${req.params.name}`);
});

app.get("/profile1/:id1/:id2", (req, res) => {
  console.log(req.params);
  return res.send(`Param value`);
});

app.get("/profile/:id1/data", (req, res) => {
  console.log(req.params);
  return res.send(`Param value`);
});

app.get("/get-form", (req, res) => {
  return res.send(`
    <html lang="en">
    <body>
        <h1>User Form</h1>
        <form action='/form_submit' method='POST'>
        <label for="name">Name</label>
        <input type="text" name="name"/>
        <br/>
        <label for="email">Email</label>
        <input type="text" name="email"/>
        <br/>
        <label for="password">Password</label>
        <input type="password" name="password"/>
        <br/>
        <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
});

app.post("/form_submit", (req, res) => {
  console.log(req.body);
  return res.send("Form submitted successfully");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
  //   isTest();
});

//API
//GET
//Query, params
//Return an html to client (Form)
//POST request
//Body

//client axios.post('/form', {}) --->REST API (express.JSON()) ---> Server (req.body)
//POSTMAN
