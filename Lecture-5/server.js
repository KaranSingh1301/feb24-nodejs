//ES5
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
const userModel = require("./userModel");

//constants
const app = express();
const MONGO_URI = `mongodb+srv://karan:12345@cluster0.22wn2.mongodb.net/feb24TestDb`;
const store = new mongoDbSession({
  uri: MONGO_URI,
  collection: "sessions",
});

//middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "This is fab nodejs class",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//db-connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.get("/register", (req, res) => {
  return res.send(`
    <html lang="en">
    <body>
        <h1>Registration Form</h1>
        <form action='/register' method='POST'>
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

app.get("/login", (req, res) => {
  return res.send(`
    <html lang="en">
    <body>
        <h1>Login Form</h1>
        <form action='/login' method='POST'>
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

app.post("/register", async (req, res) => {
  console.log(req.body);

  const { name, password, email } = req.body;

  const userObj = new userModel({
    name: name,
    email: email,
    password: password,
  });

  try {
    const userDb = await userObj.save();
    //return res.status(201).json("Register success");
    return res.send({
      status: 201,
      message: "User created successfully",
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user from DB
    const userDb = await userModel.findOne({ email: email });

    if (!userDb) {
      return res.status(400).json("User not found, Email incorrect");
    }

    //compare the password
    if (password !== userDb.password) {
      return res.send({
        status: 400,
        message: "Password incorrect",
      });
    }

    //session base
    req.session.isAuth = true;

    return res.status(200).json("Login Successfull");
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

app.get("/dashboard", (req, res) => {
  console.log(req.session);
  if (req.session.isAuth === true) {
    return res.send("Dashboard page");
  } else {
    return res.send("Session expired, please login again");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
