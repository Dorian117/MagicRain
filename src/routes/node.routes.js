const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyAdmin } = require('../middlewares/role.middleware');
const { getAllNodes, getNodeById, createNode, updateNode, deleteNode } = require('../controllers/node.controller');

router.get('/',       verifyToken,              getAllNodes);
router.get('/:id',    verifyToken,              getNodeById);
router.post('/',      verifyToken, verifyAdmin, createNode);
router.put('/:id',    verifyToken, verifyAdmin, updateNode);
router.delete('/:id', verifyToken, verifyAdmin, deleteNode);

module.exports = router;
