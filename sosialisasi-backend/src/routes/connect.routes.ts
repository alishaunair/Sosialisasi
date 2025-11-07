import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import connectionControlllers from "../controllers/connection.controlllers";

const router = express.Router();

router.patch("/", authMiddleware, connectionControlllers.connect);

export default router;
