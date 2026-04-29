const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyAdmin } = require('../middlewares/role.middleware');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');

router.get('/',     verifyToken, verifyAdmin, getAllUsers);
router.get('/:id',  verifyToken, getUserById);
router.put('/:id',  verifyToken, updateUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
