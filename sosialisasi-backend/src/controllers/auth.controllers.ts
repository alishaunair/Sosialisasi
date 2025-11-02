import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/users.models";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";

type TRegister = {
  profilePicture: string;
  fullName: string;
  status: string;
  email: string;
  linkedinLink: string;
  password: string;
  jurusan: string;
  universitas: string;
  confirmPassword: string;
};

type TLogin = {
  email: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  profilePicture: Yup.string().required(),
  fullName: Yup.string().required(),
  status: Yup.string()
    .oneOf(["Mahasiswa", "Dosen"], "Role tidak valid")
    .required("Role wajib diisi"),
  email: Yup.string().required(),
  linkedinLink: Yup.string().required(),
  jurusan: Yup.string().required(),
  universitas: Yup.string().required(),
  password: Yup.string()
    .required()
    .min(6, "Password minimal 6 karakter")
    .test(
      "at-least-one-uppercase-letter",
      "Password setidaknya memiliki 1 huruf kapital",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test(
      "at-least-one-number",
      "Password setidaknya memiliki 1 angka",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[0-9])/;
        return regex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password tidak sesuai"),
});

export default {
  async register(req: Request, res: Response) {
    const {
      fullName,
      email,
      jurusan,
      universitas,
      linkedinLink,
      status,
      password,
      confirmPassword,
    } = req.body as unknown as TRegister;

    const profilePicturePath = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    try {
      await registerValidateSchema.validate({
        profilePicture: profilePicturePath,
        fullName,
        email,
        status,
        jurusan,
        universitas,
        linkedinLink,
        password,
        confirmPassword,
      });

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email sudah terdaftar",
          data: null,
        });
      }

      const result = await UserModel.create({
        profilePicture: profilePicturePath,
        fullName,
        email,
        jurusan,
        universitas,
        status,
        linkedinLink,
        password,
      });

      res.status(200).json({
        message: "Registrasi Berhasil Dilakukan",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as unknown as TLogin;
    try {
      const user = await UserModel.findOne({
        email: email,
        isActive: true,
      });

      if (!user) {
        return res.status(403).json({
          message: "Pengguna tidak ditemukan",
          data: null,
        });
      }

      const validatePassword: boolean = encrypt(password) === user.password;

      if (!validatePassword) {
        return res.status(403).json({
          message: "User not found",
          data: null,
        });
      }
      const token = generateToken({
        id: user._id,
        role: user.role,
      });

      res.status(200).json({
        message: "Login success",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);

      res.status(200).json({
        message: "Success get user profile",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };
      const user = await UserModel.findOneAndUpdate(
        {
          activationCode: code,
        },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: "Account activated successfully",
        data: user,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async editProfile(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      const {
        profilePicture,
        fullName,
        status,
        jurusan,
        universitas,
        linkedinLink,
      } = req.body as {
        profilePicture?: string;
        fullName?: string;
        status?: string;
        jurusan?: string;
        universitas?: string;
        linkedinLink?: string;
      };

      const updatedData: Record<string, any> = {};

      if (profilePicture !== undefined)
        updatedData.profilePicture = profilePicture;
      if (fullName !== undefined) updatedData.fullName = fullName;
      if (status !== undefined) updatedData.status = status;
      if (jurusan !== undefined) updatedData.jurusan = jurusan;
      if (universitas !== undefined) updatedData.universitas = universitas;
      if (linkedinLink !== undefined) updatedData.linkedinLink = linkedinLink;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({
          message: "Nothing changed!",
          data: null,
        });
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user?.id },
        {
          $set: updatedData,
        },
        {
          new: true,
        }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
          data: null,
        });
      }
      return res.status(200).json({
        message: "Profile edit successfully",
        data: updatedUser,
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
