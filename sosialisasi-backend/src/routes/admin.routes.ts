import express from "express";
import adminControllers from "../controllers/admin.controllers";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/userstatus-count",
  authMiddleware,
  adminControllers.getUserActiveStatusCount
);

router.get(
  "/usercontent-count",
  authMiddleware,
  adminControllers.getUserContentCount
);

export default router;
