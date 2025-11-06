import Image from "next/image";

interface IPropTypes {
  showSearch?: boolean;
  toggleSidebar?: () => void;
}

const DashboardLayoutNavbar = ({
  showSearch = false,
  toggleSidebar,
}: IPropTypes) => {
  return (
    <nav className="sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-white p-4 shadow-md sm:p-5">
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="h-10 w-10 sm:h-12 sm:w-12"
        />
        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
          SosialisaSI
        </h1>
      </div>

      {showSearch && (
        <div className="hidden w-1/3 flex-row items-center gap-3 rounded-3xl border-2 border-[#E5E7EB] bg-[#FAFAFF] px-4 py-2 sm:gap-4 sm:px-5 md:flex lg:w-1/2">
          <i className="fas fa-search text-base text-[#787878] sm:text-lg"></i>
          <input
            className="w-full bg-transparent text-sm placeholder-[#ADAEBC] focus:outline-none sm:text-base lg:text-lg"
            placeholder="Search Post, People, Opportunities.."
          />
        </div>
      )}

      <div className="flex flex-row items-center gap-3 sm:gap-5 lg:gap-7">
        {/* Hamburger Menu - Only visible on mobile */}
        <button
          onClick={toggleSidebar}
          className="cursor-pointer rounded-xl bg-[#FAFAFF] p-2.5 transition-colors hover:bg-gray-100 sm:p-3 md:hidden"
        >
          <i className="fas fa-bars text-base text-[#787878] sm:text-lg"></i>
        </button>

        {/* Notification */}
        <div className="cursor-pointer rounded-xl bg-[#FAFAFF] p-2.5 transition-colors hover:bg-gray-100 sm:p-3 lg:p-4">
          <i className="fas fa-bell text-base text-[#787878] sm:text-lg"></i>
        </div>

        {/* Logout */}
        <div className="cursor-pointer rounded-xl bg-[#FAFAFF] p-2.5 transition-colors hover:bg-gray-100 sm:p-3 lg:p-4">
          <i className="fas fa-sign-out-alt text-base text-[#787878] sm:text-lg"></i>
        </div>
      </div>
    </nav>
  );
};

export default DashboardLayoutNavbar;
