import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { User } from "../models/users.models";
import { SECRET } from "./env";

export interface IUserToken
  extends Omit<
    User,
    | "profilePicture"
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "jurusan"
    | "universitas"
    | "linkedinLink"
    | "status"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: "24h",
  });
  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};
