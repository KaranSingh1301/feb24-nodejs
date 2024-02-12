//ES5
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userModel");

//constants
const app = express();
const MONGO_URI = `mongodb+srv://karan:12345@cluster0.22wn2.mongodb.net/feb24TestDb`;

//middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/form_submit", async (req, res) => {
  console.log(req.body);

  const { name, password, email } = req.body;
  console.log(name, email, password);

  //userModel.create({name:name, email:email, password:password})

  // save() , create an obj of the Schema
  const userObj = new userModel({
    //schema : client
    name: name,
    email: email,
    password: password,
  });

  try {
    const userDb = await userObj.save();
    // return res.status(200).json(data)
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

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
