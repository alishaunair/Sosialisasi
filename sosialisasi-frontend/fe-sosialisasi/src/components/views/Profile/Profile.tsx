"use client";

import Image from "next/image";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/router";
import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-6 bg-gray-50 p-6 lg:flex-row">
      {/* ===== SIDEBAR SPACER (agar tidak tertutup sidebar tetap proporsional) ===== */}
      <div className="hidden w-[280px] lg:block"></div>

      {/* ===== KONTEN PROFIL ===== */}
      <div className="flex-1 space-y-6">
        {/* Header Profil */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardBody className="flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <Image
                src="/images/profile-default.png"
                alt="User Avatar"
                width={90}
                height={90}
                className="rounded-full border border-gray-200"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Ahmad Rizki Pratama
                </h2>
                <p className="text-gray-600">
                  Web Developer & Digital UI/UX Designer
                </p>
                <p className="text-sm text-gray-500">
                  Computer Science • Faculty of Engineering • Universitas Indonesia
                </p>
                <p className="text-sm text-blue-500">500+ connections</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button color="warning" variant="solid" className="rounded-full px-5">
                Connect
              </Button>
              <Button color="primary" variant="bordered" className="rounded-full px-5">
                Message
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* ===== ABOUT ===== */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex justify-between items-center border-b border-gray-100 p-4">
            <h3 className="text-lg font-semibold text-gray-800">About</h3>
            <FaPencilAlt className="text-gray-400 text-sm cursor-pointer" />
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 leading-relaxed">
              Passionate web developer and UI/UX designer with a strong background in computer science.
              I enjoy creating digital experiences that bridge the gap between technology and human needs.
              Currently pursuing my degree while working on various projects that combine technical skills
              with creative design thinking.
            </p>
          </CardBody>
        </Card>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* ===== LEFT COLUMN ===== */}
          <div className="col-span-2 space-y-6">
            {/* Education */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="flex justify-between items-center border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                <FaPencilAlt className="text-gray-400 text-sm cursor-pointer" />
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/univ.png"
                      alt="Universitas Indonesia"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">Universitas Indonesia</h4>
                      <p className="text-gray-500 text-sm">
                        Bachelor of Computer Science • 2021 - 2025 • GPA: 3.8/4.0
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/sma.png"
                      alt="SMA Negeri 3 Tangerang Selatan"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">
                        SMA Negeri 3 Tangerang Selatan
                      </h4>
                      <p className="text-gray-500 text-sm">Science Major • 2018 - 2021</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Work Experience */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="flex justify-between items-center border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
                <FaPencilAlt className="text-gray-400 text-sm cursor-pointer" />
              </CardHeader>
              <CardBody className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Frontend Developer Intern
                  </h4>
                  <p className="text-gray-500 text-sm">
                    TechStart Indonesia • Jun 2024 – Present
                  </p>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    Developing responsive web applications using React.js and Tailwind CSS.
                    Collaborating with design team to implement user-friendly interfaces.
                  </p>
                  <div className="mt-3">
                    <Image
                      src="/images/work-team.jpg"
                      alt="Work experience"
                      width={500}
                      height={250}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="space-y-6">
            {/* Awards */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="flex justify-between items-center border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Awards & Certifications</h3>
                <FaPencilAlt className="text-gray-400 text-sm cursor-pointer" />
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">Best UI Design</h4>
                  <p className="text-gray-500 text-sm">
                    Hackathon UI 2024 — Winner of UI Design category
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">React Developer</h4>
                  <p className="text-gray-500 text-sm">
                    Hackathon UNAIR — Professional React development certification
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Organizations */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="flex justify-between items-center border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Organizations</h3>
                <FaPencilAlt className="text-gray-400 text-sm cursor-pointer" />
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">Vice President</h4>
                  <p className="text-gray-500 text-sm">
                    Computer Science Student Association • 2023 - 2024
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Led initiatives to improve student engagement and organized tech workshops.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Volunteer</h4>
                  <p className="text-gray-500 text-sm">
                    Digital Literacy Program • 2022 - Present
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Teaching basic computer skills and web development to underprivileged communities.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;