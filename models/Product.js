const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Price cannot be negative."],
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", productSchema);
