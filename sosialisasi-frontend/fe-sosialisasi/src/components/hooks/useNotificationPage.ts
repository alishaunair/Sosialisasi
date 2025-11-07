import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import connectionServices from "@/services/connection.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IConnection } from "@/types/Home";

const useNotificationPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);

  // === Ambil koneksi yang sudah diterima ===
  const {
    data: connections = [],
    isLoading: isLoadingConnections,
    refetch: refetchConnections,
  } = useQuery<IConnection[]>({
    queryKey: ["connections"],
    queryFn: connectionServices.getConnections,
    enabled: !!session,
  });

  // === Ambil permintaan koneksi yang masih pending ===
  const {
    data: pendingConnections = [],
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useQuery<IConnection[]>({
    queryKey: ["pending-connections"],
    queryFn: connectionServices.getPendingConnections,
    enabled: !!session,
  });

  // === Terima koneksi ===
  const { mutate: handleAcceptConnection } = useMutation({
    mutationFn: connectionServices.acceptConnection,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Permintaan koneksi berhasil diterima.",
      });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["pending-connections"] });
    },
    onError: () => {
      setToaster({
        type: "error",
        message: "Gagal menerima koneksi.",
      });
    },
  });

  // === Tolak koneksi ===
  const { mutate: handleRejectConnection } = useMutation({
    mutationFn: connectionServices.rejectConnection,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Permintaan koneksi berhasil ditolak.",
      });
      queryClient.invalidateQueries({ queryKey: ["pending-connections"] });
    },
    onError: () => {
      setToaster({
        type: "error",
        message: "Gagal menolak koneksi.",
      });
    },
  });

  // === Kirim atau batalkan permintaan koneksi ===
  const { mutate: handleToggleConnection } = useMutation({
    mutationFn: connectionServices.toggleConnection,
    onSuccess: (res) => {
      setToaster({
        type: "success",
        message: res?.message || "Berhasil memperbarui status koneksi.",
      });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["pending-connections"] });
    },
    onError: () => {
      setToaster({
        type: "error",
        message: "Gagal memperbarui koneksi.",
      });
    },
  });

  return {
    connections,
    pendingConnections,
    isLoadingConnections,
    isLoadingPending,
    handleAcceptConnection,
    handleRejectConnection,
    handleToggleConnection,
    refetchConnections,
    refetchPending,
    currentUserId: session?.user?.id,
  };
};

export default useNotificationPage;
