"use client";

import ProtectedPages from "./components/protectedPages";
import { useAuth } from "./context/authContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStationsByUserId } from "./services/station";
import Sidebar from "./components/sidebar";
import StationList from "./components/stationList";
import Paginator from "./components/paginator";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { user } = useAuth();

  const stationsByUserId = useQuery({
    queryKey: ["stationsByUserId", user?.id, currentPage],
    queryFn: () => getStationsByUserId(user?.id || "", currentPage),
    enabled: !!user?.id,
  });

  return (
    <ProtectedPages>
      <div className="flex">
        <Sidebar stationsByUserId={stationsByUserId.data} />
        <div className="flex-1 bg-white flex flex-col gap-5 pb-4">
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
