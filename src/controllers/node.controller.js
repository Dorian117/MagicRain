const Node = require('../models/Node');

const getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find().sort({ registeredAt: -1 });
    return res.status(200).json({ nodes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNodeById = async (req, res) => {
  try {
    const node = await Node.findById(req.params.id);
    if (!node) {
      return res.status(404).json({ message: 'Nodo no encontrado' });
    }
    return res.status(200).json({ node });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNode = async (req, res) => {
  try {
    const { name, zone } = req.body;
    if (!name || !zone) {
      return res.status(400).json({ message: 'Name y zone son requeridos' });
    }
    const newNode = new Node({ name, zone });
    await newNode.save();
    return res.status(201).json({ message: 'Nodo registrado exitosamente', node: newNode });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNode = async (req, res) => {
  try {
    const { name, zone, status } = req.body;
    const node = await Node.findByIdAndUpdate(
      req.params.id,
      { name, zone, status },
      { new: true }
    );
    if (!node) {
      return res.status(404).json({ message: 'Nodo no encontrado' });
    }
    return res.status(200).json({ message: 'Nodo actualizado', node });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteNode = async (req, res) => {
  try {
    const node = await Node.findByIdAndDelete(req.params.id);
    if (!node) {
      return res.status(404).json({ message: 'Nodo no encontrado' });
    }
    return res.status(200).json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllNodes, getNodeById, createNode, updateNode, deleteNode };
