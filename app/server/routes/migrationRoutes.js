import express from "express";
const router = express.Router();
import {isAuthorized} from "../middleware/auth.js";
//const migrationController = require("../controllers/migrationController");

router.use(isAuthorized);

//router.get("/UsersAndTeams", migrationController.migrateUsersAndTeams); // migrate users and teams

export {router as migrationRoutes};