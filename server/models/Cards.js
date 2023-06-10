const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slides: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

module.exports = model("Cards", schema);
