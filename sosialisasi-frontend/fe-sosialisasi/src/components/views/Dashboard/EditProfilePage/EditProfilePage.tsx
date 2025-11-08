import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/react";
import { FaCircle } from "react-icons/fa6";
import useEditProfile from "../../../hooks/useEditProfile";

const EditProfile = () => {
  const {
    control,
    handleSubmit,
    handleEditProfile,
    isLoadingProfile,
    isPendingEditProfile,
    isDirty,
    preview,
    profileData,
    errors,
    handleCancel,
  } = useEditProfile();

  const currentPicture = profileData?.data?.data?.profilePicture;

  if (isLoadingProfile) {
    return (
      <DashboardLayout>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col justify-center gap-6 bg-gray-50 py-6 lg:flex-row">
        <div className="mb-6 w-full max-w-3xl self-start overflow-y-auto rounded-2xl border border-gray-200 bg-white px-6 py-8 lg:w-1/2">
          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="flex flex-col gap-8 px-8 py-12"
          >
            <Controller
              name="profilePicture"
              control={control}
              render={({ field: { onChange, ref } }) => (
                <div className="flex flex-col items-center gap-4">
                  <label
                    htmlFor="profile-picture-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile preview"
                        className="h-28 w-28 rounded-full object-cover"
                      />
                    ) : currentPicture ? (
                      <img
                        src={`http://localhost:3001${currentPicture}`}
                        alt="Current profile"
                        className="h-28 w-28 rounded-full object-cover"
                      />
                    ) : (
                      <FaCircle className="h-28 w-28 text-gray-300" />
                    )}
                    <span className="mt-4 rounded-lg bg-[#5568FE] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5568FE]/90">
                      Ubah Foto
                    </span>
                  </label>
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    ref={ref}
                    onChange={(e) => {
                      if (e.target.files?.length) onChange(e.target.files);
                    }}
                    className="hidden"
                  />
                  {errors.profilePicture && (
                    <p className="text-sm text-red-500">
                      {errors.profilePicture.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Full Name
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}
            />

            <Controller
              name="universitas"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Universitas
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your university"
                    />
                  </div>
                </div>
              )}
            />

            <Controller
              name="jurusan"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Jurusan
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your major"
                    />
                  </div>
                </div>
              )}
            />

            <Controller
              name="linkedinLink"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Jurusan
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your linkedin"
                    />
                  </div>
                </div>
              )}
            />

            <button
              type="submit"
              disabled={!isDirty || isPendingEditProfile}
              className="mt-8 flex cursor-pointer items-center justify-center rounded-2xl bg-[#5568FE] p-5 text-[20px] font-bold text-white hover:bg-[#5568FE]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isPendingEditProfile ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Simpan Perubahan"
              )}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="-mt-6 cursor-pointer p-5 text-center text-[20px] font-bold text-[#7A7A7A] hover:text-black"
            >
              Batalkan
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
