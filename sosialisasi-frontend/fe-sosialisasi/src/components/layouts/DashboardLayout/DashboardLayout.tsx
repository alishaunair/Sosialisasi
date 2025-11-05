import React, { useState } from "react";
import DashboardLayoutNavbar from "./DashboardLayoutNavbar";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

interface IPropTypes {
  children: React.ReactNode;
  showSearch?: boolean;
}

const DashboardLayout = ({ children, showSearch }: IPropTypes) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#FAFAFF]">
      <DashboardLayoutNavbar
        showSearch={showSearch}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex h-full overflow-hidden">
        <div className="hidden md:block">
          <DashboardLayoutSidebar />
        </div>

        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DashboardLayoutSidebar />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        <section className="flex w-full flex-1 justify-center overflow-y-auto px-2 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
