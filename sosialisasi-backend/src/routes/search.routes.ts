import express from "express";
import searchControllers from "../controllers/search.controllers";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, searchControllers.searchAll);

export default router;
