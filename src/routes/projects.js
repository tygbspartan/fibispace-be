const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/stats', projectController.getProjectStats);
router.get('/:id', projectController.getProjectById);

// Admin routes (no file upload middleware needed)
router.post('/', authenticate, isAdmin, projectController.createProject);
router.put('/:id', authenticate, isAdmin, projectController.updateProject);
router.delete('/:id', authenticate, isAdmin, projectController.deleteProject);

module.exports = router;