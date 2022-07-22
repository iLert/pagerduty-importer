import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();


router.get("/authorize-result", authController.authorize_result);
router.get("/authorize", authController.authorize);

export {router as authRoutes};