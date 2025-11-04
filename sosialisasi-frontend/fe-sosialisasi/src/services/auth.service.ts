import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin, IActivation, IRegister, IEditProfile } from "@/types/Auth";

const authServices = {
  register: (payload: FormData) =>
    instance.post(`${endpoint.AUTH}/register`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editProfile: (payload: FormData) =>
    instance.put(`${endpoint.AUTH}/edit-profile`, payload, {
      headers: {
        "Content-Type": "multipart/form-data", // <-- TAMBAHKAN INI
      },
    }),
};

export default authServices;
