import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import connectionControlllers from "../controllers/connection.controlllers";

const router = express.Router();

router.post("/:id", authMiddleware, connectionControlllers.connect);
router.patch("/:id", authMiddleware, connectionControlllers.acceptConnection);
router.patch(
  "/rejected/:id",
  authMiddleware,
  connectionControlllers.rejectConnection
);
router.get("/", authMiddleware, connectionControlllers.getConnections);
router.get(
  "/pending",
  authMiddleware,
  connectionControlllers.getPendingConnections
);

export default router;
