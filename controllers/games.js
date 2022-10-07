const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const Game = require("../models/games.js");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage });

router.get("/", (req, res) => {
  Game.find({}, (error, allGames) => {
    if (error) {
      console.log("Error retrieving data " + error.message);
    } else {
      res.render("./index.ejs", { allGames });
    }
  });
});

//adding new game into db

router.get("/newgamedb", (req, res) => {
  res.render("./newGame");
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
    img: final_img,
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
    res.render("edit", { games: gameDets });
  });
});

router.put("/:id", (req, res) => {
  Game.findByIdAndUpdate({ new: true }, (err, updatedGame) => {
    res.redirect("/:id");
  });
});

module.exports = router;
