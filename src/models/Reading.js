const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  nodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
  temperature: { type: Number, required: true, min: -10, max: 40 },
  humidity: { type: Number, required: true, min: 0, max: 100 },
  pressure: { type: Number, required: true, min: 500, max: 900 },
  rainfall: { type: Boolean, required: true },
  condition: { type: String, required: true, enum: ['rain', 'sun', 'cold', 'cloudy', 'fog'] },
  timestamp: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

ReadingSchema.index({ nodeId: 1, timestamp: -1 });

module.exports = mongoose.model('Reading', ReadingSchema);
