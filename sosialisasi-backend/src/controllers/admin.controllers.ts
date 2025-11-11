import { Response } from "express";
import UserModel from "../models/users.models";
import { IReqUser } from "../middlewares/auth.middleware";
import ContentModel from "../models/content.models";

export default {
  async getUserActiveStatusCount(req: IReqUser, res: Response) {
    try {
      const activeUserCount = await UserModel.countDocuments({
        role: "user",
        isActive: true,
      });
      const inactiveUserCount = await UserModel.countDocuments({
        role: "user",
        isActive: false,
      });
      res.status(200).json({
        message: "User active status count retrieved successfully",
        data: {
          activeUsers: activeUserCount,
          inactiveUsers: inactiveUserCount,
          totalUsers: activeUserCount + inactiveUserCount,
        },
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async getUserContentCount(req: IReqUser, res: Response) {
    try {
      const allUserContentsCount = await ContentModel.countDocuments({
        type_content: "All",
        status_content: true,
      });
      const competitionUserContentsCount = await ContentModel.countDocuments({
        type_content: "Competition",
        status_content: true,
      });
      const projectUserContentsCount = await ContentModel.countDocuments({
        type_content: "Project",
        status_content: true,
      });
      res.status(200).json({
        message: "User active status count retrieved successfully",
        data: {
          allUserContents: allUserContentsCount,
          competitionUserContents: competitionUserContentsCount,
          projectUserContents: projectUserContentsCount,
          totalContent:
            allUserContentsCount +
            competitionUserContentsCount +
            projectUserContentsCount,
        },
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
