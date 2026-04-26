const express = require('express');
const cors = require('cors');

// const authRoutes = require('./routes/auth.routes');
// const sensorRoutes = require('./routes/sensor.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'MagicRain API v1.0', status: 'online' });
});

app.get('/test-models', (req, res) => {
  try {
    require('./models/User');
    require('./models/Node');
    require('./models/Reading');
    res.json({ models: { User: 'cargado', Node: 'cargado', Reading: 'cargado' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.use('/api/auth', authRoutes);
// app.use('/api/sensors', sensorRoutes);

module.exports = app;
