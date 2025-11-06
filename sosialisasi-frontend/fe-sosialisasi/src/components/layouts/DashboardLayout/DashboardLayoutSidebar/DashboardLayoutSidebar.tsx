// DashboardLayoutSidebar.tsx
import { useRouter } from "next/router";
import Link from "next/link";
import { SIDEBAR_ITEMS } from "../DashboardLayout.constants";
import { cn } from "@/utils/cn";

const DashboardLayoutSidebar = () => {
  const router = useRouter();

  return (
    <aside className="flex h-full w-64 flex-col overflow-y-auto bg-white p-4 px-4 py-6 shadow-md sm:px-5 sm:py-8 md:w-64 lg:w-72">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map((item) => (
          <Link href={item.href} key={item.key}>
            <div
              className={cn(
                "flex cursor-pointer flex-row items-center gap-3 rounded-xl p-3 text-base text-[#787878] transition-colors hover:bg-gray-50 sm:gap-4 sm:p-4 sm:text-lg lg:text-xl",
                {
                  "bg-[#5568FE] text-white hover:bg-[#5568FE]/90":
                    router.pathname === item.href,
                },
              )}
            >
              <i className={item.icon}></i>
              <h3 className="font-regular">{item.label}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-lg bg-[#E5E7EB]/30 px-3 py-4 text-center sm:mt-6 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-5 lg:mt-8">
        <p className="text-xl sm:text-2xl">🚀</p>
        <p className="text-base font-bold text-[#202020] sm:text-lg">
          Share Your Journey
        </p>
        <p className="text-xs leading-relaxed text-[#787878] sm:text-sm">
          Connect with peers and discover amazing opportunities
        </p>
        <button
          onClick={() => router.push("/dashboard/create-post")}
          className="w-full rounded-lg bg-[#5568FE] py-2 text-sm font-medium text-white transition-colors hover:bg-[#5568FE]/80 focus:outline-none sm:rounded-xl sm:py-2.5 sm:text-base"
        >
          Create Post
        </button>
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
