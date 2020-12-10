const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const customersRoutes = require("./routes/customer");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://vedant:${process.env.PASSWORD}@cluster0.zwdyx.mongodb.net/Bankist?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB Connected");
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use(customersRoutes);

const port = process.env.PORT || 3000;

app.listen(port);
