const express = require('express');
const dataController = require('../controllers/dataController');
const isAuthorized = require('../middleware/auth');
const router = express.Router();

//router.use(isAuthorized);

router.get('/users', dataController.getUsersFromPagerDuty);
router.get('/teams', dataController.getTeamsFromPagerDuty);
router.get('/schedules', dataController.getSchedulesFromPagerDuty);
router.get('/escalation_policies', dataController.getEscalationPoliciesFromPagerDuty);
router.get('/services', dataController.getServicesFromPagerDuty);

module.exports = router;