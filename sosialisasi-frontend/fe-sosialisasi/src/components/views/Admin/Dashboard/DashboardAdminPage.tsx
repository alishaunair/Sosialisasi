import DashboardLayout from "@/components/layouts/DashboardLayout";

const DashboardAdmin = () => {
  return (
    <DashboardLayout>
      <div className="flex w-full flex-row gap-4 px-2 sm:gap-6 sm:px-4 lg:flex-row lg:gap-8">
        <div className="flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
          <div className="flex min-w-0 flex-col gap-2">
            <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">
              Dashboard Admin
            </h3>
            <span className="truncate text-xs text-gray-500 sm:text-sm">
              Selamat datang di panel admin SosialisaSI!
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 h-[9.75rem] rounded-[1rem] bg-[#FFFFFF] p-[1.5rem] shadow-lg">
              <div className="mb-[0.75rem] flex flex-row justify-between">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  Total Pengguna
                </h3>
                <span className="truncate text-xs text-gray-500 sm:text-sm">
                  Icon
                </span>
              </div>
              <div className="mb-[0.5rem]">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  430
                </h3>
              </div>
              <div>
                <h3 className="truncate text-base font-semibold text-green-500 sm:text-lg">
                  +12% dari bulan lalu
                </h3>
              </div>
            </div>
            <div className="col-span-1 h-[9.75rem] rounded-[1rem] bg-[#FFFFFF] p-[1.5rem] shadow-lg">
              <div className="mb-[0.75rem] flex flex-row justify-between">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  Pengguna Aktif
                </h3>
                <span className="truncate text-xs text-gray-500 sm:text-sm">
                  Icon
                </span>
              </div>
              <div className="mb-[0.5rem]">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  412
                </h3>
              </div>
              <div>
                <h3 className="truncate text-base font-semibold text-green-500 sm:text-lg">
                  +12% dari bulan lalu
                </h3>
              </div>
            </div>
            <div className="col-span-1 h-[9.75rem] rounded-[1rem] bg-[#FFFFFF] p-[1.5rem] shadow-lg">
              <div className="mb-[0.75rem] flex flex-row justify-between">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  Konten Dilaporkan
                </h3>
                <span className="truncate text-xs text-gray-500 sm:text-sm">
                  Icon
                </span>
              </div>
              <div className="mb-[0.5rem]">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  430
                </h3>
              </div>
              <div>
                <h3 className="truncate text-base font-semibold text-red-500 sm:text-lg">
                  Perlu tindakan
                </h3>
              </div>
            </div>
            <div className="col-span-1 h-[9.75rem] rounded-[1rem] bg-[#FFFFFF] p-[1.5rem] shadow-lg">
              <div className="mb-[0.75rem] flex flex-row justify-between">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  Postingan Pending
                </h3>
                <span className="truncate text-xs text-gray-500 sm:text-sm">
                  Icon
                </span>
              </div>
              <div className="mb-[0.5rem]">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  30
                </h3>
              </div>
              <div>
                <h3 className="truncate text-base font-semibold text-orange-500 sm:text-lg">
                  Perlu review
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
