const express = require('express');
const router = express.Router();
const isAuthorized = require('../middleware/auth');
const migrationController = require('../controllers/migrationController');

router.use(isAuthorized);

router.get('/UsersAndTeams', migrationController.migrateUsersAndTeams); // migrate users and teams

module.exports = router;