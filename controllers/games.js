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

router.get("/newGame", (req, res) => {
  res.render("./newGame");
});

router.post("/", upload.single("myImg"), async (req, res, next) => {
  //   console.log(req.file);
  //   console.log(req.body);
  //   let img = fs.readFileSync(req.file.path);
  //   let encode_img = img.toString("base64");
  let final_img = {
    data: fs.readFileSync(
      path.join(__dirname, "..", "/uploads/", req.file.filename)
    ),
    contentType: req.file.mimetype,
    // image: new Buffer.alloc(req.file.size, encode_img, "base64"),
  };
  //   console.log(encode_img);
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: final_img,
    // img: new Buffer.from(req.body.img, "base64"),
    // contentType: req.file.mimetype,
  };

  Game.create(obj, (err, Game) => {
    if (err) {
      console.log("Error adding new game" + err.message);
    } else {
      //   console.log(Game.img.Buffer);
      //   res.contentType(final_img.contentType);
      //   res.send(final_img.image);

      res.redirect("/");
    }
  });
});

module.exports = router;
