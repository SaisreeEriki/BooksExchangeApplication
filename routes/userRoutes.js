// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser); 
router.post('/logout', authController.logoutUser);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/resetPswd', authController.resetPassword);


router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.get('/users/:userId/profilePic', userController.getUserProfilePic);
router.post('/users', userController.createUser);
// router.put('/users/:userId', authenticateJWT, userController.updateUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.post('/roles', userController.createRole);
router.get('/roles', userController.getAllRoles);
router.get('/roles/:id', userController.getRoleById);
router.put('/roles/:id', userController.updateRole);
router.delete('/roles/:id', userController.deleteRole);

module.exports = router;
