const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/users.js");
const Game = require("../models/games.js");
const bcrypt = require("bcrypt");

//storage for uploaded images

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage });

//index page route

//adding new game into db

router.get("/newgamedb", (req, res) => {
  res.render("./newGame");
});

router.get("/", (req, res) => {
  Game.find({}, (error, allGames) => {
    if (error) {
      console.log("Error retrieving data " + error.message);
    } else {
      console.log(allGames);
      res.render("./index.ejs", {
        userDetails: req.session.currentUser,
        allGames,
      });
    }
  });
});

router.post("/", upload.single("myImg"), async (req, res, next) => {
  //   console.log(req.file);
  //   console.log(req.body);

  let final_img = {
    data: fs.readFileSync(
      path.join(__dirname, "..", "/uploads/", req.file.filename)
    ),
    contentType: req.file.mimetype,
  };
  //   console.log(encode_img);
  const obj = {
    name: req.body.name,
    title: req.body.title,
    desc: req.body.desc,
    myImg: final_img,
  };

  Game.create(obj, (err, Game) => {
    if (err) {
      console.log("Error adding new game" + err.message);
    } else {
      //   console.log(Game.img.Buffer);

      res.redirect("/");
    }
  });
});

//going into game details page

router.get("/:id", (req, res) => {
  Game.findById(req.params.id, (err, gameDets) => {
    res.render("gameDets", { games: gameDets });
  });
});

//delete entry by id

router.delete("/:id", (req, res) => {
  Game.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/");
  });
});

//edit data

router.get("/:id/edit", (req, res) => {
  Game.findById(req.params.id, (err, gameDets) => {
    if (!gameDets) {
      console.log("game not found");
    }
    res.render("edit", { games: gameDets });
  });
});

router.put("/:id", upload.single("myImg"), (req, res) => {
  //console.log(req.body);
  let final_img = {
    data: fs.readFileSync(
      path.join(__dirname, "..", "/uploads/", req.file.filename)
    ),
    contentType: req.file.mimetype,
  };
  //   console.log(encode_img);
  const obj = {
    name: req.body.name,
    title: req.body.title,
    desc: req.body.desc,
    myImg: final_img,
  };
  Game.findByIdAndUpdate(
    req.params.id,
    obj,
    { new: true },
    (err, updatedGame) => {
      res.redirect("/");
    }
  );
});

module.exports = router;
