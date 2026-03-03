const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);

// Admin routes (no file upload middleware needed)
router.post('/', authenticate, isAdmin, clientController.addClient);
router.put('/:id', authenticate, isAdmin, clientController.updateClient);
router.delete('/:id', authenticate, isAdmin, clientController.deleteClient);

module.exports = router;