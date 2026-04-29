const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
// const sensorRoutes = require('./routes/sensor.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'MagicRain API v1.0', status: 'online' });
});

app.use('/api/auth', authRoutes);
// app.use('/api/sensors', sensorRoutes);

module.exports = app;
