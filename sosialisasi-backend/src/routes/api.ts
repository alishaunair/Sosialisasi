import express from "express";
import authRoutes from "./auth.routes";
import uploadRoutes from "./upload.routes";
import likeRoutes from "./like.routes";
import commentRoutes from "./comment.routes";
import searchRoutes from "./search.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/like", likeRoutes);
router.use("/comment", commentRoutes);
router.use("/search", searchRoutes);

export default router;
