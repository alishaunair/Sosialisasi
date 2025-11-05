import express from "express";
import upload from "../middlewares/upload.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import homeControllers from "../controllers/home.controllers";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Tidak ada file yang diunggah." });
  }
  return res.status(200).json({
    message: "File berhasil diunggah!",
    data: { path: req.file.path },
  });
});

router.get("/content", homeControllers.getAll);
router.post(
  "/content",
  authMiddleware,
  upload.single("file"),
  homeControllers.create
);
router.delete("/content/:id", homeControllers.delete);
router.get("/content/:id", homeControllers.getOne);
router.get("/contentuser", authMiddleware, homeControllers.getById);

export default router;
