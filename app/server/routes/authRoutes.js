const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


router.get('/authorize-result', authController.authorize_result);
router.get('/authorize', authController.authorize);

module.exports = router;