const express = require('express');
const router = express.Router();
const { 
  getDepartments, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} = require('../controllers/departmentController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.use(protect, authorizeRoles('ADMIN')); // All CRUD operations restricted to ADMIN

router.get('/', getDepartments);
router.post('/', createDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;
