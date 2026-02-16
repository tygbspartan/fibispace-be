const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public routes
router.post('/', contactController.contactUs);

module.exports = router;