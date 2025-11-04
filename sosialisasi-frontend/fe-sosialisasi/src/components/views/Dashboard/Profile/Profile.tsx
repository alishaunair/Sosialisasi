import Image from "next/image";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/router";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import authServices from "@/services/auth.service";
import useProfile from "./useProfile";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Profile = () => {
  const router = useRouter();
  const { profile, isLoading } = useProfile();
  console.log(profile);

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="pt-8 text-center text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col gap-6 bg-gray-50 p-6 lg:flex-row">
        <div className="flex w-full flex-row justify-between gap-8 px-28">
          <div className="flex flex-col gap-10">
            <article className="rounded-2xl bg-white p-10">
              <div className="mb-16 flex flex-row gap-8">
                <div className="flex flex-col gap-3">
                  <div className="justify-content flex flex-row items-center gap-5">
                    <Image
                      src={
                        profile?.profilePicture
                          ? `http://localhost:3001${profile.profilePicture}`
                          : "/images/logo.png"
                      }
                      alt={profile?.fullName || "User Avatar"}
                      width={100}
                      height={100}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <h1 className="text-[32px] font-bold text-[#1A1A1A]">
                      {profile?.fullName}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center gap-2 text-[#7A7A7A]">
                    <i className="fa-solid fa-graduation-cap text-[20px]"></i>
                    <h3 className="font-regular text-[24px]">
                      <span>{profile?.status}</span>{" "}
                      <span>{profile?.jurusan}</span> -{" "}
                      <span>{profile?.universitas}</span>
                    </h3>
                  </div>
                  <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-row items-center gap-2 rounded-xl border-2 border-[#5568FE] px-4 py-2">
                      <Image
                        src={"/images/Linkedin.png"}
                        width={20}
                        height={20}
                        alt="Gambar"
                      />
                      <p className="font-medium text-[#5568FE]">
                        <a
                          href={profile?.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Linkedin
                        </a>
                      </p>
                    </div>
                    <div
                      className="flex cursor-pointer flex-row items-center rounded-xl bg-[#5568FE] px-4 py-2"
                      onClick={() => router.push("/dashboard/edit-profile")}
                    >
                      <p className="text-[19px] font-bold text-white">
                        Edit Profil
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-[#E7E7E7]"></div>
            </article>

            <div className="mb-5 flex w-full flex-col gap-7 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h1 className="text-[28px] font-semibold text-[#1A1A1A]">
                Postingan
              </h1>
              <article className="flex flex-col">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src="/images/logo.png"
                    alt="User"
                    className="h-12 w-12 rounded-full bg-black object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h3 className="text-base font-semibold text-[#202020] sm:text-lg">
                        Nama Pengguna
                      </h3>
                      <div className="rounded-full bg-[#5568FE]/10 px-3 py-1">
                        <h5 className="text-xs font-medium text-[#5568FE] sm:text-sm">
                          Project
                        </h5>
                      </div>
                    </div>
                    <h4 className="text-xs text-[#787878] sm:text-sm">
                      31 Oktober 2025 15.30
                    </h4>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm whitespace-pre-wrap text-[#202020] sm:text-base">
                    Ini adalah contoh teks konten postingan. Bisa berisi
                    deskripsi atau tulisan panjang pengguna.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-5 text-gray-600">
                    <button className="flex items-center gap-2 transition-colors duration-200 hover:text-red-500">
                      <i className="fa-regular fa-heart text-xl"></i>
                      <span className="text-sm font-medium">12</span>
                    </button>

                    <button className="flex items-center gap-2 transition-colors duration-200 hover:text-[#5568FE]">
                      <i className="fa-regular fa-comment text-xl"></i>
                      <span className="text-sm font-medium">5</span>
                    </button>

                    <i className="fa-solid fa-share cursor-pointer text-xl"></i>
                  </div>
                </div>
                <div className="mt-7 border-2 border-gray-100"></div>
              </article>

              <article className="flex flex-col">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src="/images/logo.png"
                    alt="User"
                    className="h-12 w-12 rounded-full bg-black object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h3 className="text-base font-semibold text-[#202020] sm:text-lg">
                        Nama Pengguna
                      </h3>
                      <div className="rounded-full bg-[#5568FE]/10 px-3 py-1">
                        <h5 className="text-xs font-medium text-[#5568FE] sm:text-sm">
                          Project
                        </h5>
                      </div>
                    </div>
                    <h4 className="text-xs text-[#787878] sm:text-sm">
                      31 Oktober 2025 15.30
                    </h4>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm whitespace-pre-wrap text-[#202020] sm:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam blanditiis temporibus laborum fugit tenetur officia
                    sunt hic nobis neque eum, corporis accusamus culpa sit nisi
                    odio! Aut hic minus cupiditate.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-5 text-gray-600">
                    <button className="flex items-center gap-2 transition-colors duration-200 hover:text-red-500">
                      <i className="fa-regular fa-heart text-xl"></i>
                      <span className="text-sm font-medium">12</span>
                    </button>

                    <button className="flex items-center gap-2 transition-colors duration-200 hover:text-[#5568FE]">
                      <i className="fa-regular fa-comment text-xl"></i>
                      <span className="text-sm font-medium">5</span>
                    </button>

                    <i className="fa-solid fa-share cursor-pointer text-xl"></i>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Koneksi */}
          <div className="flex w-[50%] flex-col gap-5 self-start rounded-2xl bg-white p-8">
            <h1 className="text-[24px] font-bold text-[#1A1A1A]">Koneksi</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-4">
                <img
                  src="/images/logo.png"
                  alt="User"
                  className="h-12 w-12 rounded-full bg-black object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-[18px] font-medium text-[#1A1A1A]">
                    Kurniawan Ilham
                  </h2>
                  <p className="font-regular text-[16px] text-[#7A7A7A]">
                    Teknik Nuklir
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-4">
                <img
                  src="/images/logo.png"
                  alt="User"
                  className="h-12 w-12 rounded-full bg-black object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-[18px] font-medium text-[#1A1A1A]">
                    Kurniawan Ilham
                  </h2>
                  <p className="font-regular text-[16px] text-[#7A7A7A]">
                    Teknik Nuklir
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-4">
                <img
                  src="/images/logo.png"
                  alt="User"
                  className="h-12 w-12 rounded-full bg-black object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-[18px] font-medium text-[#1A1A1A]">
                    Kurniawan Ilham
                  </h2>
                  <p className="font-regular text-[16px] text-[#7A7A7A]">
                    Teknik Nuklir
                  </p>
                </div>
              </div>
              <h4 className="mt-2 cursor-pointer text-center text-[16px] font-semibold text-[#5568FE]">
                Lihat Lebih Banyak
              </h4>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
