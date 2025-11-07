import { Request, Response } from "express";
import UserModel from "../models/users.models";
import { IReqUser } from "../middlewares/auth.middleware";

export default {
  async follow(req: IReqUser, res: Response) {
    try {
      const currentUserId = req.user?.id;
      const targetUserId = req.params.id.trim();

      if (!currentUserId) {
        return res.status(401).json({ message: "User tidak terautentikasi." });
      }

      if (currentUserId.toString() === targetUserId) {
        return res
          .status(400)
          .json({ message: "Tidak bisa mengikuti diri sendiri." });
      }

      const targetUser = await UserModel.findById(targetUserId);
      if (!targetUser) {
        return res.status(404).json({ message: "User tidak ditemukan." });
      }

      await UserModel.findByIdAndUpdate(targetUserId, {
        $addToSet: { connections: currentUserId },
      });

      return res
        .status(200)
        .json({ message: "Berhasil berkoneksi dengan user." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server saat memproses connect.",
        error,
      });
    }
  },

  async getFollowers(req: Request, res: Response) {
    try {
      const userId = req.params.id.trim();

      const user = await UserModel.findById(userId)
        .populate("followers", "fullName profilePicture")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan." });
      }

      res.status(200).json({
        message: "Berhasil mengambil daftar followers.",
        data: user.connections,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data followers.",
        error,
      });
    }
  },
};
