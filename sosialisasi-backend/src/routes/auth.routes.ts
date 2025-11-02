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
router.post("/login", authControllers.login);
router.get("/me", authMiddleware, authControllers.me);
router.post("/activation", authControllers.activation);
router.put("/edit-profile", authMiddleware, authControllers.editProfile);

export default router;
