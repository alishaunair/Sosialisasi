import { useContext, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  profilePicture: yup
    .mixed<FileList>()
    .test(
      "required",
      "Foto profil wajib diunggah",
      (value) => value instanceof FileList && value.length > 0,
    )
    .required(),
  fullName: yup.string().required("Please input your fullname"),
  jurusan: yup.string().required("Please input your major study"),
  universitas: yup.string().required("Please input your university"),
  status: yup
    .string()
    .oneOf(["Mahasiswa", "Dosen"], "Status tidak valid")
    .required("Status wajib diisi"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  linkedinLink: yup
    .string()
    .url("Please enter a valid URL")
    .required("Please provide your LinkedIn link"),
  password: yup
    .string()
    .required("Please input your password")
    .min(6, "Password minimal 6 karakter")
    .test(
      "at-least-one-uppercase-letter",
      "Password setidaknya memiliki 1 huruf kapital",
      (value) => !!value && /[A-Z]/.test(value),
    )
    .test(
      "at-least-one-number",
      "Password setidaknya memiliki 1 angka",
      (value) => !!value && /[0-9]/.test(value),
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password not match")
    .required("Please input your confirmation password"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;

const useRegister = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({ ...visiblePassword, [key]: !visiblePassword[key] });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const profilePictureFile = watch("profilePicture");
  const preview = useMemo(() => {
    return profilePictureFile && profilePictureFile[0]
      ? URL.createObjectURL(profilePictureFile[0])
      : null;
  }, [profilePictureFile]);

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: authServices.register,
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Register Success! Please check your email for activation.",
      });
      router.push("/auth/login");
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data?.message || "Register failed.",
      });
    },
  });

  const handleRegister = (data: RegisterFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "profilePicture" && value instanceof FileList && value[0]) {
        formData.append(key, value[0]);
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    mutateRegister(formData);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
    trigger,
    preview,
  };
};

export default useRegister;
