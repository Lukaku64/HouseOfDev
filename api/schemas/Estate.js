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
      stars: { type: Number, min: 0, max: 5 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 },
  date: [
    {
      date: String,
      hour: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      confirm: { type: Boolean, default: false },
    },
  ],
});

const estateModel = mongoose.model("Estate", estateSchema);

module.exports = estateModel;
