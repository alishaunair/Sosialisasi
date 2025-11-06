import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import likeControllers from "../controllers/like.controllers";

const router = express.Router();

router.post("/toggle/:id", authMiddleware, likeControllers.toggleLike);

export default router;
