import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  profilePicture: string;
  fullName: string;
  status: string;
  email: string;
  jurusan: string;
  universitas: string;
  linkedinLink: string;
  password: string;
  confirmPassword: string;
}

interface IEditProfile {
  fullName: string;
  jurusan: string;
  universitas: string;
  status: string;
}

interface IActivation {
  code: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  status?: string;
  jurusan?: string;
  universitas?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  ILogin,
  IEditProfile,
  IActivation,
  UserExtended,
  SessionExtended,
  JWTExtended,
};
