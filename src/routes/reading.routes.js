const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyAdmin } = require('../middlewares/role.middleware');
const {
  getLatestReading,
  getAllReadings,
  getReadingById,
  createReading,
  updateReading,
  deleteReading
} = require('../controllers/reading.controller');

router.get('/latest',  getLatestReading);
router.get('/',        verifyToken,              getAllReadings);
router.get('/:id',     verifyToken,              getReadingById);
router.post('/',       verifyToken, verifyAdmin, createReading);
router.put('/:id',     verifyToken, verifyAdmin, updateReading);
router.delete('/:id',  verifyToken, verifyAdmin, deleteReading);

module.exports = router;
