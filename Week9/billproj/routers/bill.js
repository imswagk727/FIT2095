// /src/routes/Items.js
const mongoose = require("mongoose");

const Bill = require("../models/bill");

module.exports = {
  getAll: function (req, res) {
    Bill.find({}).exec(function (err, items) {
      if (err) {
        return res.status(404).json(err);
      } else {
        res.json(items);
      }
    });
  },
  createOne: function (req, res) {
    let newBillDetails = req.body;
    console.log(newBillDetails);
    newBillDetails._id = new mongoose.Types.ObjectId();

    let bill = new Bill(newBillDetails);
    bill.save(function (err) {
      if (err) console.log(err);
      res.json(bill);
    });
  },

  deleteOne: function (req, res) {
    Bill.findOneAndRemove({ _id: req.params.id }, function (err, doc) {
      if (err) return res.status(400).json(err);
      res.json(doc);
    });
  },
};
