const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  binLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  fullnessPercentage: { type: Number, default: 0, min: 0, max: 100 },
  isBinFull: { type: Boolean, default: false },
  isCollected: { type: Boolean, default: false },
  temperature: { type: Number, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Bin', BinSchema);
