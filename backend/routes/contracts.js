// routes/contracts.js
const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const { protect } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(contractController.getAllContracts)
  .post(contractController.processUploads, contractController.createContract);

router.route('/:id')
  .get(contractController.getContract)
  .put(contractController.processUploads, contractController.updateContract)
  .delete(contractController.deleteContract);

module.exports = router;