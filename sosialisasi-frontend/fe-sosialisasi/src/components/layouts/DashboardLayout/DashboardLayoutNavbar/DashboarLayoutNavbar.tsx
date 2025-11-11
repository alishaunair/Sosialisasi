import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/router";

interface IPropTypes {
  showSearch?: boolean;
  showNotif?: boolean;
  toggleSidebar?: () => void;
}

const DashboardLayoutNavbar = ({
  showSearch = false,
  showNotif = false,
  toggleSidebar,
}: IPropTypes) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);
  const { setSearchTerm } = useSearch();
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(localSearch.trim());
    }
  };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await queryClient.cancelQueries();
      queryClient.removeQueries();

      await signOut({ callbackUrl: "/auth/login" });
    } catch (err) {
      console.error("Logout error: ", err);
      setToaster?.({ type: "error", message: "Gagal Logout" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-white px-3 py-2 shadow-md sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-3">
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="h-10 w-10 sm:h-12 sm:w-12"
        />
        <h1 className="text-sm font-bold sm:text-lg md:text-xl lg:text-2xl">
          SosialisaSI
        </h1>
      </div>

      {showSearch && (
        <div className="hidden w-1/3 flex-row items-center gap-3 rounded-3xl border-2 border-[#E5E7EB] bg-[#FAFAFF] px-4 py-2 sm:gap-4 sm:px-5 md:flex lg:w-1/2">
          <i className="fas fa-search text-base text-[#787878] sm:text-lg"></i>
          <input
            className="w-full bg-transparent text-sm placeholder-[#ADAEBC] focus:outline-none sm:text-base lg:text-lg"
            placeholder="Search Post, People, Opportunities.."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>
      )}

      <div className="flex flex-row items-center gap-3 sm:gap-5 lg:gap-7">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer rounded-xl bg-[#FAFAFF] p-2.5 transition-colors hover:bg-gray-100 sm:p-3 md:hidden"
        >
          <i className="fas fa-bars text-base text-[#787878] sm:text-lg"></i>
        </button>

        <div
          className={`cursor-pointer rounded-xl p-2.5 transition-colors sm:p-3 lg:p-4 ${showNotif ? "bg-[#5568FE] hover:bg-[#4657d8]" : "bg-[#FAFAFF] hover:bg-gray-100"}`}
          onClick={() => router.push("/dashboard/notification")}
        >
          <i
            className={`fas fa-bell text-base sm:text-lg ${showNotif ? "text-white" : "text-[#787878]"}`}
          ></i>
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-xl bg-[#FAFAFF] p-2.5 transition-colors hover:bg-gray-100 sm:p-3 lg:p-4"
        >
          <i className="fas fa-sign-out-alt text-base text-[#787878] sm:text-lg"></i>
        </button>
      </div>
    </nav>
  );
};

export default DashboardLayoutNavbar;
