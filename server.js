const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://localhost:27017/userApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
const professions = ["actor", "actress", "singer"];

app.get("/users", async (req, res) => {
  const { profession } = req.query;
  if (profession) {
    const users = await User.find({ profession });
    res.render("users/index", { users, profession });
  } else {
    const users = await User.find({});
    res.render("users/index", { users, profession: "All" });
  }
});

app.get("/users/new", (req, res) => {
  res.render("users/new", { professions });
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.redirect("/users/${newUser._id}");
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("users/show", { user });
});

app.get("/users/:id/edit", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("users/edit", { user, professions });
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/user/${user._id}`);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  res.redirect("/users");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000");
});
