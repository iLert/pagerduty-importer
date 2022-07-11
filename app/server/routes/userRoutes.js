const express = require('express');
const router = express.Router();
const isAuthorized = require('../middleware/auth');
const userController = require('../controllers/userController');

router.use(isAuthorized);

router.get('/current', userController.getCurrentUser); // get current user 
router.get('/migrateAllUsers', userController.migrateAllUsers); // migrate all users

module.exports = router;