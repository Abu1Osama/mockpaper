const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    user: String,
    book: String,
    totalAmount: Number,
  },
  {
    versionkey: false,
  }
);
const orderModel = mongoose.model("user", orderSchema);
module.exports = {
  orderModel,
};
