const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    itemCode: {
      type: String,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);