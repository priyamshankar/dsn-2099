const express =require("express");
const ejs=require('ejs');
const app=express();
const path=require("path");
const port=process.env.PORT ||3000;
const router=require("./database/connection");
const dbconnection=require("./database/dbConnection");
// const router=express.Router();

const frontend_path = path.join(__dirname, "../../frontend/views");
app.set("views", frontend_path);
// ejs.registerpar
app.set('view engine','ejs');
app.listen(port,()=>{
    console.log("localhost connected");
})
// app.use(router);

const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
// const app = express();
// const app = new express.Router();
const userDetModel = require("./database/userDet");
const bcrypt = require("bcryptjs");
// const mongoose =require("mongoose");
require("./database/dbConnection");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const user = await userDetModel.findOne({ _id: req.cookies.id });
  res.render("index", {
    cookie: req.cookies.jwt,
    users: user,
  });
//   console.log(user);
  // console.log(req.cookies.jwt);
  console.log(user);
});

app.get("/registration", (req, res) => {
  res.render("registrationPage");
});

app.post("/registration", async (req, res) => {
  try {
    const fetchPwd = req.body.password;
    const secPwd = await bcrypt.hash(fetchPwd, 10);
    const pwComp = await bcrypt.compare(req.body.cnfmPassword, secPwd);
    if (pwComp) {
      // console.log(req.body);
      const saveUserDet = new userDetModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        password: secPwd,
        cnfmPassword: secPwd,
      });
      console.log(saveUserDet);
      await saveUserDet.save();
      const token = await saveUserDet.generateAuthToken(); //generateAuthToken is user defined
      res.cookie(`jwt register`, token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
      });
      res.render("loginPage");
    } else {
      res.send("password didn't matche");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  res.render("loginPage");
  // console.log(req.cookies.jwt);
});

app.post("/login", async (req, res) => {
  try {
    const userName = req.body.userName;
    const loginDetDb = await userDetModel.findOne({ userName: userName });
    const password = req.body.password;
    const pwComp = await bcrypt.compare(password, loginDetDb.password);
    // console.log(loginDetDb);
    if (pwComp) {
      const token = await loginDetDb.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });
      res.cookie("id", loginDetDb._id, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });
      // res.render("index");
      res.render("loginPage");
      // res.render("authenticate");
      // console.log(token);
    } else {
      res.send("password or user id wrong");
    }
  } catch (err) {
    res.send("error");
    console.log(err);
  }
});

app.get("/authenticate", auth, (req, res) => {
  res.render("authenticate", {
    users: req.user,
  });
  // console.log(req.user.firstName);
});

// app.get("")
app.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currentToken) => {
      // console.log(currentToken.token);
      // console.log(req.token);
      return currentToken.token !== req.token;
    });
    await res.clearCookie("jwt");
    await res.clearCookie("id");
    await req.user.save();
    res.render("loginPage");
    console.log("logout successfully");
  } catch (err) {
    console.log(err);
  }
});


app.get("/expenses", auth, (req, res) => {
  res.render("expenses", {
    users: req.user,
  });
});

app.get("/calendar", auth, (req, res) => {
  res.render("calendar", {
    users: req.user,
  });
});

module.exports = app;