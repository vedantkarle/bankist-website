const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
  res.render("index");
});

app.use(customersRoutes);

const port = process.env.PORT || 3000;

app.listen(port);
