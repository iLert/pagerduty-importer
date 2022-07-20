import express from 'express';
import * as dataController from '../controllers/dataController.js';
import { isAuthorized } from '../middleware/auth.js';
const router = express.Router();

//router.use(isAuthorized);

router.get('/users', dataController.getUsersFromPagerDuty);
router.get('/teams', dataController.getTeamsFromPagerDuty);
router.get('/schedules', dataController.getSchedulesFromPagerDuty);
router.get('/escalation_policies', dataController.getEscalationPoliciesFromPagerDuty);
router.get('/services', dataController.getServicesFromPagerDuty);

export {router as dataRoutes};