const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  quantity: {
    validate: {
      validator: function (aCount) {
        if (Number.isInteger(aCount)) return true;
        else return false;
      },
      message: "Quantity should be a Number",
    },
    type: Number,
    required: true,
  },

  price:Number

});
module.exports = mongoose.model("Bill", billSchema);
