import { Request, Response } from "express";
import CommentModel from "../models/comment.models";
import { IReqUser } from "../middlewares/auth.middleware";
import UserModel from "../models/users.models";
import ContentModel from "../models/content.models";

async function toggleComment(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id;
    const userId = req.user?.id;
    const { text_comment } = req.body;

    if (!text_comment) {
      return res.status(400).json({ message: "Teks komentar wajib diisi." });
    }

    const newComment = await CommentModel.create({
      text_comment,
      id_content: contentId,
      id_user: userId,
    });

    await ContentModel.findByIdAndUpdate(contentId, {
      $push: { comments: newComment._id },
    });

    const populatedComment = await newComment.populate(
      "id_user",
      "fullName profilePicture"
    );

    res.status(201).json({
      message: "Komentar berhasil dibuat.",
      data: populatedComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error saat membuat komentar." });
  }
}

async function getCommentsByContentId(req: IReqUser, res: Response) {
  try {
    const contentId = req.params.id;
    const comments = await CommentModel.find({ id_content: contentId })
      .populate("id_user", "fullName profilePicture")
      .sort({ created_at_comment: "desc" });

    res.status(200).json({
      message: "Berhasil mengambil komentar",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error saat mengambil komentar." });
  }
}

export default { toggleComment, getCommentsByContentId };
