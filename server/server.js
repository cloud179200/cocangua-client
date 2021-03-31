require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cangua",
});

//Signup handler
//Check, add user to database
app.post("/api/signup", async (req, res) => {
  const {username, password, gender, email} = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const info = {
    username: username,
    email: email,
    gender: gender,
    password: hashedPassword,
  };
  // console.log(users);
  // console.log(hashedPassword);
  //Check user
  var sqlCheckUser =
    "select count(id) as count from users where username = '" +
    req.body.username +
    "';";
  connection.query(sqlCheckUser, (err, results) => {
    let checkUser = 0;
    if (err) throw err;
    checkUser = parseInt(results[0].count);
    if (checkUser > 0) {
      res.send({ status: "Existed" });
    } else {
      //Insert new user
      var sql =
        "INSERT INTO `users`(`username`, `email`, `gender`, `wins`, `friends`, `password`)" +
        "VALUES ('" +
        username +
        "', '" +
        email +
        "', '" +
        gender +
        "', 0, '[]', '" +
        hashedPassword.toString() +
        "')";
      connection.query(sql, (err) => {
        if (err) res.json({ err });
        res.json({ status: "Success" });
      });
    }
  });
});

//Login handler
//Test JSON type
/*[
    {
        "username": "zyz",
        "password": "vietanh"
    }
]*/

app.post("/api/signin", async (req, res) => {
  const {username, password} = req.body;
  const user = { username: username };
  var sql =
    "select count(id) as count, username, password  from users where username = '" +
    username +
    "';";
  connection.query(sql, async (err, results) => {
    let checkLogin = 0;
    if (err) throw err;
    checkLogin = parseInt(results[0].count);
    var userDataPassword = results[0].password;
    if (checkLogin > 0) {
      try {
        if (await bcrypt.compare(password, userDataPassword)) {
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 12,
          });
          res.json({ token: accessToken });
        } else {
          res.json({ status: "Wrong username or password" });
        }
      } catch {}
    } else {
      //No user
      res.json({ status: "Wrong username or password" });
    }
  });
});

//Authorization and authentication handler

//Middleware function
function authenticateToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.send("Access denied");
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.send("error");
      req.user = user;
    });
    next();
  } catch (err) {
    return res.send("Invalid token");
  }
}

//Get user information form token
//Example request
/*
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5eiIsImlhdCI6MTYxNjQ0NjM2NSwiZXhwIjoxNjE2NDg5NTY1fQ.CdGTwAfd1gmCnglgeKx5JNJE_iRNSXWZ7QJj6KWjeT0"
}
*/
app.get("/api/getInfo", authenticateToken, (req, res) => {
  let username = req.user.username;
  var userInfo = [];
  var userId = "";
  let sql = "select * from users where username = '" + username + "'";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    userInfo = results[0];
    res.json(userInfo);
  });
});

app.listen(4000);
