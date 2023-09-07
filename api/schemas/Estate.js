const mongoose = require("mongoose");
const { Schema } = mongoose;

const estateSchema = new Schema({
  name: String,
  address: String,
  price: String,
  description: String,
  images: [String],
  state: { type: String, enum: ["alquiler", "comprar"], default: "alquiler" },
  squareMeter: String,
  bedroom: String,
  bathroom: String,
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comments: String,
    },
  ],
  date: [
    {
      date: Date,
      hour: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      confirm: { type: Boolean, default: false },
    },
  ],
});

const estateModel = mongoose.model("Estate", estateSchema);

module.exports = estateModel;
