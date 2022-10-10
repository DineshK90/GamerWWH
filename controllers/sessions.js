const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

//sessions for new user

router.get("/newUser", (req, res) => {
  res.render("newUser.ejs");
});

//post for creating user

router.post("/register", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log("Unable to create user" + err.message);
      res.send("Unable to create user " + err.message);
    } else {
      res.redirect("/");
    }
  });
});

//login page

router.get("/newSession", (req, res) => {
  res.render("newSession.ejs");
});

//post for login and logout session

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUserDetails) => {
    if (err) {
      console.log("Unable to retrieve user " + err.message);
    } else {
      if (foundUserDetails) {
        if (bcrypt.compareSync(req.body.password, foundUserDetails.password)) {
          req.session.currentUser = foundUserDetails;
          res.redirect("/");
        } else {
          res.send("Invalid password");
        }
      } else {
        res.send("Invalid User ID or Password");
      }
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
