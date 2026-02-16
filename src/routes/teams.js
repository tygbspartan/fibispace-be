const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllMembers);
router.get('/:id', teamController.getMemberById);

// Admin routes (no file upload middleware needed)
router.post('/', authenticate, isAdmin, teamController.addMember);
router.put('/:id', authenticate, isAdmin, teamController.updateMember);
router.delete('/:id', authenticate, isAdmin, teamController.deleteMember);

module.exports = router;