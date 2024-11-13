// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');
const { loginUser, logoutUser } = require('../controllers/authController');

router.post('/login', loginUser); 
router.post('/logout', logoutUser);


router.get('/users', userController.getAllUsers);
router.get('/users/:userId', authenticateJWT, userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', authenticateJWT, userController.updateUser);
router.delete('/users/:userId', authenticateJWT, userController.deleteUser);
router.post('/roles', authenticateJWT, userController.createRole);
router.get('/roles', authenticateJWT, userController.getAllRoles);
router.get('/roles/:id', authenticateJWT, userController.getRoleById);
router.put('/roles/:id', authenticateJWT, userController.updateRole);
router.delete('/roles/:id', authenticateJWT, userController.deleteRole);

module.exports = router;
