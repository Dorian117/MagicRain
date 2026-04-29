const Reading = require('../models/Reading');
const Node = require('../models/Node');

const getLatestReading = async (req, res) => {
  try {
    const reading = await Reading.findOne()
      .sort({ timestamp: -1 })
      .populate('nodeId', 'name zone');
    if (!reading) {
      return res.status(404).json({ message: 'No hay lecturas disponibles' });
    }
    return res.status(200).json({ reading });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllReadings = async (req, res) => {
  try {
    const { nodeId, condition, startDate, endDate } = req.query;
    const filter = {};

    if (nodeId)    filter.nodeId    = nodeId;
    if (condition) filter.condition = condition;

    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate)   filter.timestamp.$lte = new Date(endDate);
    }

    const readings = await Reading.find(filter)
      .sort({ timestamp: -1 })
      .limit(100)
      .populate('nodeId',    'name zone')
      .populate('createdBy', 'name email');

    return res.status(200).json({ total: readings.length, readings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReadingById = async (req, res) => {
  try {
    const reading = await Reading.findById(req.params.id)
      .populate('nodeId',    'name zone')
      .populate('createdBy', 'name email');
    if (!reading) {
      return res.status(404).json({ message: 'Lectura no encontrada' });
    }
    return res.status(200).json({ reading });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createReading = async (req, res) => {
  try {
    const { temperature, humidity, pressure, rainfall, condition, nodeId } = req.body;

    if (
      temperature === undefined ||
      humidity    === undefined ||
      pressure    === undefined ||
      rainfall    === undefined ||
      !condition  ||
      !nodeId
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const node = await Node.findById(nodeId);
    if (!node) {
      return res.status(404).json({ message: 'El nodo especificado no existe' });
    }

    const newReading = new Reading({
      temperature,
      humidity,
      pressure,
      rainfall,
      condition,
      nodeId,
      createdBy: req.user.id
    });
    await newReading.save();

    await Node.findByIdAndUpdate(nodeId, { lastReading: new Date() });

    return res.status(201).json({ message: 'Lectura registrada exitosamente', reading: newReading });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReading = async (req, res) => {
  try {
    const { temperature, humidity, pressure, rainfall, condition } = req.body;
    const reading = await Reading.findByIdAndUpdate(
      req.params.id,
      { temperature, humidity, pressure, rainfall, condition },
      { new: true }
    );
    if (!reading) {
      return res.status(404).json({ message: 'Lectura no encontrada' });
    }
    return res.status(200).json({ message: 'Lectura actualizada', reading });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReading = async (req, res) => {
  try {
    const reading = await Reading.findByIdAndDelete(req.params.id);
    if (!reading) {
      return res.status(404).json({ message: 'Lectura no encontrada' });
    }
    return res.status(200).json({ message: 'Lectura eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getLatestReading, getAllReadings, getReadingById, createReading, updateReading, deleteReading };
