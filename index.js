const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

//storage for uploaded file

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3000;

mongoURI = process.env.MONGODB_URI || "mongodb://192.168.100.11/gamerwwh";

mongoose.connect(mongoURI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error "));
db.once("open", function () {
  console.log("DB: Connected");
});

const gamesController = require("./controllers/games");
const sessionController = require("./controllers/sessions.js");

app.use(express.static("public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "somerandomstring",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/sessions", sessionController);
app.use("/", gamesController);

app.listen(PORT, () => console.log("You are connected to port ", PORT));
