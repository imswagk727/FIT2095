//https://hub.packtpub.com/building-movie-api-express/
const express = require("express");
const mongoose = require("mongoose");

const bill = require("./routers/bill");
let path = require("path");
const app = express();
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "dist/billproj")));
app.listen(8080);

mongoose.connect("mongodb://localhost:27017/billmanagement", function (err) {
  if (err) {
    return console.log("Mongoose - connection error:", err);
  }
  console.log("Connect Successfully");
});
app.use(function (req, res, next) {
  console.log(req.url);
  console.log(req.method);
  next();
})

app.get("/bills", bill.getAll);
app.post("/bills", bill.createOne);
app.delete("/bills/:id", bill.deleteOne);
