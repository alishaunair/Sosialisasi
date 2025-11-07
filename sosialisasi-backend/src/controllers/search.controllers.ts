import { Response } from "express";
import { IReqUser } from "../middlewares/auth.middleware";
import ContentModel from "../models/content.models";
import UserModel from "../models/users.models";

export default {
  async searchAll(req: IReqUser, res: Response) {
    try {
      const searchTerm = req.query.q as string;

      if (!searchTerm || searchTerm.trim() === "") {
        return res.status(400).json({
          message: "Isi pencarian harus ada",
        });
      }

      const searchRegex = new RegExp(searchTerm, "i");

      const [users, contents] = await Promise.all([
        UserModel.find({
          fullName: { $regex: searchRegex },
        })
          .select("fullName profilePicture status universitas")
          .lean(),

        ContentModel.find({
          text_content: { $regex: searchRegex },
        })
          .populate("userId", "fullName profilePicture")
          .sort({ created_at_content: -1 })
          .lean(),
      ]);

      const transformedContents = contents.map((content) => ({
        ...content,
        likes: content.likes?.map((like: any) => like.toString() || []),
        comments: content.comments?.map(
          (comment: any) => comment.toString() || []
        ),
      }));

      return res.status(200).json({
        message: "Hasil pencarian berhasil diambil",
        data: {
          users,
          contents: transformedContents,
        },
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Terjadi kesalahan saat melakukan pencarian",
        error: err.message,
      });
    }
  },
};
