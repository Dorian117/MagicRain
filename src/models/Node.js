const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  zone: { type: String, required: true, trim: true },
  status: { type: String, enum: ['active', 'inactive', 'fault'], default: 'active' },
  registeredAt: { type: Date, default: Date.now },
  lastReading: { type: Date, default: null }
});

module.exports = mongoose.model('Node', NodeSchema);
