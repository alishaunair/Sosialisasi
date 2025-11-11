import React, { useState } from "react";
import DashboardLayoutNavbar from "./DashboardLayoutNavbar";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { useRouter } from "next/router";
import {
  SIDEBAR_ITEMS,
  SIDEBAR_ITEMS_ADMIN,
} from "./DashboardLayout.constants";

interface IPropTypes {
  children: React.ReactNode;
  showSearch?: boolean;
  showNotif?: boolean;
}

const DashboardLayout = ({ children, showSearch, showNotif }: IPropTypes) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const routes = useRouter();
  const isRouterAdmin = routes.pathname.startsWith("/admin");
  const sidebarItems = isRouterAdmin ? SIDEBAR_ITEMS_ADMIN : SIDEBAR_ITEMS;

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#FAFAFF]">
      <DashboardLayoutNavbar
        showSearch={showSearch}
        showNotif={showNotif}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex h-full overflow-hidden">
        <div className="hidden md:block">
          <DashboardLayoutSidebar sidebarItems={sidebarItems} />
        </div>

        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DashboardLayoutSidebar sidebarItems={sidebarItems} />
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
