import express from "express";
import authControllers from "../controllers/auth.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    data: null,
  });
});

router.post(
  "/register",
  upload.single("profilePicture"),
  authControllers.register
);
router.put(
  "/edit-profile",
  authMiddleware,
  upload.single("profilePicture"),
  authControllers.editProfile
);
router.post("/login", authControllers.login);
router.get("/me", authMiddleware, authControllers.me);
router.get("/user/:id", authControllers.getUserById);
router.post("/activation", authControllers.activation);

export default router;
