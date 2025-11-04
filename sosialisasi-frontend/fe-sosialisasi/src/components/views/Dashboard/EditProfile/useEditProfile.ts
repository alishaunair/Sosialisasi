// src/components/views/Dashboard/EditProfile/useEditProfile.ts

import authServices from "@/services/auth.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToasterContext } from "@/contexts/ToasterContext";
import * as yup from "yup";

// 1. Buat skema validasi
const editProfileSchema = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | undefined>()
    .default(undefined) // <-- TAMBAHKAN BARIS INI
    .test("filelist-or-empty", "Invalid file", (value) => {
      if (!value) return true;
      return value instanceof FileList;
    }),
  fullName: yup.string(),
  jurusan: yup.string(),
  universitas: yup.string(),
  status: yup.string().oneOf(["Mahasiswa", "Dosen"]),
  linkedinLink: yup.string().url("URL LinkedIn tidak valid").optional(),
});

// 2. Buat Tipe data dari skema (Cara Paling Aman)
type EditProfileFormData = yup.InferType<typeof editProfileSchema>;

const useEditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);

  // 3. Ambil data profil (Sudah Benar)
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: authServices.getProfile,
  });

  // 4. Setup useForm
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields }, // <-- Ambil dirtyFields
    reset,
    watch,
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      fullName: "",
      universitas: "",
      jurusan: "",
      linkedinLink: "",
      status: "Mahasiswa",
    },
  });

  // 5. Logika preview gambar (Sudah Benar)
  const profilePictureFile = watch("profilePicture");
  const preview = useMemo(() => {
    if (!profilePictureFile?.[0]) return null;
    const file = profilePictureFile[0];
    if (!(file instanceof File)) return null;
    return URL.createObjectURL(file);
  }, [profilePictureFile]);

  // 6. useEffect untuk mengisi form (Sudah Benar)
  useEffect(() => {
    if (profileData) {
      const u = profileData.data.data;
      reset({
        fullName: u.fullName,
        universitas: u.universitas,
        jurusan: u.jurusan,
        linkedinLink: u.linkedinLink,
        status: u.status,
      });
    }
  }, [profileData, reset]);

  // 7. useMutation (Sudah Benar)
  const { mutate: mutateEditProfile, isPending: isPendingEditProfile } =
    useMutation({
      mutationFn: authServices.editProfile,
      onSuccess: () => {
        setToaster({ type: "success", message: "Profil berhasil diperbarui!" });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        router.push("/dashboard/profile");
      },
      onError: (error: any) => {
        setToaster({
          type: "error",
          message: error.response?.data?.message || "Gagal memperbarui profil.",
        });
      },
    });

  // 8. --- INI PERBAIKAN UTAMANYA ---
  //    handleEditProfile yang menggunakan FormData
  const handleEditProfile = (data: EditProfileFormData) => {
    const formData = new FormData();

    // Loop HANYA pada field yang diubah oleh user (dirtyFields)
    Object.keys(dirtyFields).forEach((fieldName) => {
      const key = fieldName as keyof EditProfileFormData;
      const value = data[key];

      if (key === "profilePicture" && value instanceof FileList && value[0]) {
        formData.append(key, value[0]); // Kirim file
      } else if (typeof value === "string" && value) {
        formData.append(key, value); // Kirim teks
      }
    });

    // Cek apakah ada data yang akan dikirim
    if (!formData.entries().next().done) {
      mutateEditProfile(formData); // Kirim FormData
    } else {
      setToaster({
        type: "info",
        message: "Tidak ada perubahan untuk disimpan.",
      });
    }
  };
  // --- AKHIR PERBAIKAN ---

  return {
    control,
    handleSubmit,
    handleEditProfile,
    isLoadingProfile,
    isPendingEditProfile,
    errors,
    isDirty,
    handleCancel: () => router.push("/dashboard/profile"),
    preview,
    profileData,
  };
};

export default useEditProfile;
