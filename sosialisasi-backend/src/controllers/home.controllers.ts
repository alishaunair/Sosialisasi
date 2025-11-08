import { Request, Response } from "express";
import * as Yup from "yup";
import ContentModel from "../models/content.models";
import { IReqUser } from "../middlewares/auth.middleware";
import fs from "fs";
import path from "path";
import CommentModel from "../models/comment.models";

const contentValidateSchema = Yup.object({
  text_content: Yup.string().required("Teks konten wajib diisi."),
  attachmentUrl_content: Yup.string().optional(),
  type_content: Yup.string().default("All"),
});

export default {
  async getAll(req: IReqUser, res: Response) {
    try {
      const contents = await ContentModel.find()
        .populate("userId", "fullName profilePicture")
        .sort({ created_at_content: -1 })
        .lean();

      const transformedContents = await Promise.all(
        contents.map(async (content) => {
          const commentsCount = await CommentModel.countDocuments({
            id_content: content._id,
          });

          return {
            ...content,
            likes: content.likes?.map((like) => like.toString()) || [],
            comments:
              content.comments?.map((comment) => comment.toString()) || [],
            commentsCount,
          };
        })
      );

      res.status(200).json({
        message: "Berhasil mengambil semua konten",
        data: transformedContents,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data konten",
        error: err.message,
      });
    }
  },

  async create(req: IReqUser, res: Response) {
    try {
      const { text_content, type_content } = req.body;

      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "User tidak terautentikasi.",
        });
      }
      const attachmentUrl_content = req.file
        ? `/uploads/${req.file.filename}`
        : undefined;

      const newContent = await ContentModel.create({
        text_content,
        attachmentUrl_content,
        type_content,
        created_at_content: new Date(),
        userId,
      });

      return res.status(201).json({
        message: "Konten berhasil dibuat.",
        data: newContent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan server.",
        error,
      });
    }
  },

  async delete(req: IReqUser, res: Response) {
    try {
      const id: string = req.params.id.trim();

      const content = await ContentModel.findById(id);
      if (!content) {
        return res.status(404).json({
          message: "Konten tidak ditemukan.",
        });
      }

      if (content.attachmentUrl_content) {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          content.attachmentUrl_content
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await ContentModel.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Konten berhasil dihapus.",
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Terjadi kesalahan server saat menghapus konten.",
        error,
      });
    }
  },

  async getOne(req: IReqUser, res: Response) {
    try {
      const id: string = req.params.id.trim();

      const content = await ContentModel.findById(id)
        .populate("userId", "fullName profilePicture")
        .lean();

      if (!content) {
        return res.status(404).json({ message: "Konten tidak ditemukan" });
      }

      const commentsCount = await CommentModel.countDocuments({
        id_content: content._id,
      });

      res.status(200).json({
        message: "Berhasil mengambil konten",
        data: {
          ...content,
          likes: content.likes?.map((like) => like.toString()) || [],
          comments: content.comments?.map((c) => c.toString()) || [],
          commentsCount,
        },
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil konten",
        error: err.message,
      });
    }
  },

  async getById(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "User tidak terautentikasi.",
        });
      }

      const contents = await ContentModel.find({ userId })
        .populate("userId", "fullName profilePicture")
        .sort({ created_at_content: -1 })
        .lean();

      const transformedContents = await Promise.all(
        contents.map(async (content) => {
          const commentsCount = await CommentModel.countDocuments({
            id_content: content._id,
          });

          return {
            ...content,
            likes: content.likes?.map((like: any) => like.toString()) || [],
            comments:
              content.comments?.map((comment: any) => comment.toString()) || [],
            commentsCount,
          };
        })
      );

      res.status(200).json({
        message: "Berhasil mengambil semua konten pengguna",
        data: transformedContents,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data konten",
        error: err.message,
      });
    }
  },
  async getByUserId(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: "Parameter user_id diperlukan.",
        });
      }

      const contents = await ContentModel.find({ userId: id })
        .populate("userId", "fullName profilePicture")
        .sort({ created_at_content: -1 })
        .lean();

      const transformedContents = await Promise.all(
        contents.map(async (content) => {
          const commentsCount = await CommentModel.countDocuments({
            id_content: content._id,
          });

          return {
            ...content,
            likes: content.likes?.map((like: any) => like.toString()) || [],
            comments:
              content.comments?.map((comment: any) => comment.toString()) || [],
            commentsCount,
          };
        })
      );

      res.status(200).json({
        message: "Berhasil mengambil semua konten pengguna berdasarkan ID",
        data: transformedContents,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data konten",
        error: err.message,
      });
    }
  },
};
