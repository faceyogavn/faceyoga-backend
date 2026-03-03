const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  type: String
}, { _id: false });   // 👈 cực quan trọng

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "guest"
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [itemSchema],   // 👈 dùng schema riêng
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);