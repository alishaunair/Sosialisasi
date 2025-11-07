import DashboardLayout from "@/components/layouts/DashboardLayout";
import useNotificationPage from "@/components/hooks/useNotificationPage";
import Image from "next/image";

const NotificationsPage = () => {
  const {
    pendingConnections,
    isLoadingPending,
    handleAcceptConnection,
    handleRejectConnection,
  } = useNotificationPage();

  return (
    <DashboardLayout showNotif>
      <div className="flex flex-1">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-4xl font-bold text-[#202020]">Notifikasi</h1>
          <p className="font-regular text-lg text-[#787878]">
            Update selalu dengan koneksi dan aktivitasmu
          </p>

          <div className="mt-8 flex w-full flex-col gap-6">
            {isLoadingPending && (
              <p className="text-center text-[#787878]">Memuat notifikasi...</p>
            )}

            {!isLoadingPending && pendingConnections.length === 0 && (
              <p className="text-center text-[#787878]">
                Belum ada notifikasi koneksi.
              </p>
            )}

            {/* List notifikasi */}
            {pendingConnections.map((conn) => (
              <div
                key={conn.user._id}
                className="flex w-full flex-row items-center justify-between rounded-2xl bg-white p-8 shadow-md"
              >
                <div className="flex flex-row items-center gap-5">
                  <Image
                    src={`http://localhost:3001${conn.user.profilePicture}`}
                    width={500}
                    height={500}
                    className="h-20 w-20 rounded-full object-cover"
                    alt="User"
                  />

                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">
                      {conn.user.fullName}
                    </h2>

                    <p className="text-md text-[#787878]">Meminta Koneksi</p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <button
                    onClick={() => handleAcceptConnection(conn.user._id)}
                    className="text-semibold cursor-pointer rounded-xl bg-[#5568FE] px-7 py-3 text-lg text-white hover:bg-[#4657d8] focus:outline-none"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleRejectConnection(conn.user._id)}
                    className="cursor-pointer rounded-xl border-2 border-[#FFB27C] px-7 py-3 text-lg text-[#FFB27C] hover:bg-[#FFB27C] hover:text-white focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
