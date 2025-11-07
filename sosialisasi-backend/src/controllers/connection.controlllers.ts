import { Response } from "express";
import UserModel from "../models/users.models";
import { IReqUser } from "../middlewares/auth.middleware";
import mongoose from "mongoose";

export default {
  async connect(req: IReqUser, res: Response) {
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

      if (!Array.isArray(targetUser.connections)) {
        targetUser.connections = [];
      }

      const existingConnectionIndex = targetUser.connections.findIndex(
        (conn: any) => conn.user.toString() === currentUserId.toString()
      );

      if (existingConnectionIndex !== -1) {
        targetUser.connections.splice(existingConnectionIndex, 1);
        await targetUser.save();

        return res.status(200).json({
          message: "Koneksi dibatalkan.",
        });
      } else {
        targetUser.connections.push({
          user: new mongoose.Types.ObjectId(currentUserId),
          status: "pending",
        } as any);

        await targetUser.save();

        return res.status(200).json({
          message: "Permintaan koneksi berhasil dikirim.",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server saat memproses koneksi.",
        error,
      });
    }
  },

  async acceptConnection(req: IReqUser, res: Response) {
    try {
      const currentUserId = req.user?.id;
      const requesterId = req.params.id.trim();

      if (!currentUserId) {
        return res.status(401).json({ message: "User tidak terautentikasi." });
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id: currentUserId,
          "connections.user": requesterId,
        },
        {
          $set: { "connections.$.status": "accepted" },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Permintaan koneksi tidak ditemukan.",
        });
      }

      return res.status(200).json({
        message: "Permintaan koneksi diterima.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server saat menerima koneksi.",
        error,
      });
    }
  },

  async getConnections(req: IReqUser, res: Response) {
    try {
      const currentUserId = req.user?.id;

      if (!currentUserId) {
        return res.status(401).json({
          message: "User tidak terautentikasi.",
        });
      }

      const user = await UserModel.findById(currentUserId)
        .populate("connections.user", "fullName profilePicture")
        .lean();

      if (!user) {
        return res.status(404).json({
          message: "User tidak ditemukan.",
        });
      }

      const acceptedConnections = user.connections?.filter(
        (conn) => conn.status === "accepted"
      );

      res.status(200).json({
        message: "Berhasil mengambil daftar connections Anda.",
        totalConnections: acceptedConnections?.length || 0,
        data: acceptedConnections,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data connections.",
        error,
      });
    }
  },

  async getPendingConnections(req: IReqUser, res: Response) {
    try {
      const currentUserId = req.user?.id;

      if (!currentUserId) {
        return res.status(401).json({
          message: "User tidak terautentikasi.",
        });
      }

      const user = await UserModel.findById(currentUserId)
        .populate("connections.user", "fullName profilePicture")
        .lean();

      if (!user) {
        return res.status(404).json({
          message: "User tidak ditemukan.",
        });
      }

      const pendingConnections = user.connections?.filter(
        (conn) => conn.status === "pending"
      );

      res.status(200).json({
        message: "Berhasil mengambil daftar permintaan koneksi.",
        totalPending: pendingConnections?.length || 0,
        data: pendingConnections,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data pending connections.",
        error,
      });
    }
  },

  async rejectConnection(req: IReqUser, res: Response) {
    try {
      const currentUserId = req.user?.id;
      const requesterId = req.params.id.trim();

      if (!currentUserId) {
        return res.status(401).json({ message: "User tidak terautentikasi." });
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id: currentUserId,
          "connections.user": requesterId,
          "connections.status": "pending",
        },
        {
          $set: { "connections.$.status": "rejected" },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Permintaan koneksi tidak ditemukan atau sudah diproses.",
        });
      }

      return res.status(200).json({
        message: "Permintaan koneksi berhasil ditolak.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server saat menolak koneksi.",
        error,
      });
    }
  },
};
