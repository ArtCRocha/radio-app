"use client";

import ProtectedPages from "./components/protectedPages";
import { useAuth } from "./context/authContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStationsByUserId } from "./services/station";
import Sidebar from "./components/sidebar";
import StationList from "./components/stationList";
import Paginator from "./components/paginator";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchStation, setSearchStation] = useState<string>("");

  const { user, logout } = useAuth();

  const router = useRouter();

  const stationsByUserId = useQuery({
    queryKey: ["stationsByUserId", user?.id, currentPage, searchStation],
    queryFn: () =>
      getStationsByUserId(user?.id || "", currentPage, searchStation),
    enabled: !!user?.id,
  });

  return (
    <ProtectedPages>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-white flex flex-col gap-5">
          <div className="py-2 px-7 border border-gray-200 flex justify-between flex-wrap gap-2">
            <div className="flex gap-3">
              <div className="rounded-full border border-gray-500 flex justify-center items-center p-2">
                <CiUser color="#545454" size={30} />
              </div>
              <div>
                <p className="text-black font-semibold">{user?.completName}</p>
                <p className="text-black">{user?.email}</p>
              </div>
            </div>
            <button
              className="cursor-pointer flex gap-2 justify-center items-center bg-white border-none outline-none"
              onClick={() => {
                logout().then(
                  () => {
                    toast.success("Logout efetuado com sucesso");
                    router.push("/login");
                  },
                  () => {
                    toast.error("Erro ao efetuar logout");
                  }
                );
              }}
            >
              <IoExitOutline color="#1267fc" size={25} />
              <p className="text-black">Sair</p>
            </button>
          </div>
          <div className="w-full px-7">
            <input
              value={searchStation}
              onChange={(e) => setSearchStation(e.target.value)}
              placeholder="Buscar por nome da rádio..."
              className={`w-full p-2 border border-gray-300 rounded-md outline-none text-black`}
            />
          </div>
          <StationList
            stationData={stationsByUserId.data}
            stationIsLoading={stationsByUserId.isLoading}
          />
          {stationsByUserId.data?.totalPages > 0 && (
            <Paginator
              currentPage={currentPage}
              totalPages={stationsByUserId.data?.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </ProtectedPages>
  );
}
