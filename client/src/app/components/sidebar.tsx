"use client";

import { useAuth } from "../context/authContext";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStations,
  getStationsIds,
  registerStation,
} from "../services/station";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPlusCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { StationProps } from "../types/station";
import ToolTip from "../components/toolTip";
import Spinner from "./spinner";
import { toast } from "react-toastify";
import Button from "./button";

export default function Sidebar() {
  const [stationName, setStationName] = useState<string>("");
  const [stationLimit, setStationLimit] = useState<number>(10);
  const [openSidebar, setopenSidebar] = useState(true);
  const [isAddingToList, setIsAddingToList] = useState<string>("");

  const { user } = useAuth();

  const client = useQueryClient();

  const stationsData = useQuery({
    queryKey: ["stations", stationName, stationLimit],
    queryFn: () => getStations({ name: stationName, limit: stationLimit }),
    enabled: !!stationLimit,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const stationsIds = useQuery({
    queryKey: ["stationsIds", user?.id || ""],
    queryFn: () => getStationsIds(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <div
      className={`${
        openSidebar ? "w-96" : "w-16"
      } h-screen bg-white text-black border-l-2 border-gray-200 border duration-300 flex flex-col gap-2 p-4`}
    >
      <GiHamburgerMenu
        color="#1267fc"
        size={25}
        cursor="pointer"
        onClick={() => setopenSidebar(!openSidebar)}
      />
      <input
        value={stationName}
        onChange={(e) => setStationName(e.target.value)}
        placeholder="Buscar por nome da rádio..."
        className={`w-full p-2 border border-gray-300 rounded-md outline-none ${
          openSidebar ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`${
          openSidebar ? "overflow-y-auto" : "overflow-y-hidden"
        } flex flex-col items-start h-full py-7`}
      >
        {stationsData.data?.map((station: StationProps) => {
          const stationInListFinded = stationsIds.data?.find(
            (x: string) => x === station.stationuuid
          );
          return (
            <div
              key={station.stationuuid}
              className={`${
                openSidebar ? "opacity-100" : "opacity-0"
              } duration-300 w-full p-4 flex justify-between items-center`}
            >
              <ToolTip text={station.name}>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      station.name?.length > 25
                        ? `${station.name?.slice(0, 25)}...`
                        : station.name,
                  }}
                ></p>
              </ToolTip>
              {stationInListFinded ? (
                <FaCircleCheck color="#28b44e" size={25} />
              ) : (
                <BsPlusCircle
                  color="#1267fc"
                  size={25}
                  cursor={isAddingToList ? "not-allowed" : "pointer"}
                  onClick={() => {
                    setIsAddingToList(station.stationuuid);
                    const {
                      name,
                      changeuuid,
                      serveruuid,
                      stationuuid,
                      url,
                      urlResolved,
                      homePage,
                      favicon,
                      country,
                      state,
                      countryCode,
                      language,
                      codec,
                    } = station;
                    registerStation({
                      name,
                      changeuuid,
                      serveruuid,
                      stationuuid,
                      url,
                      urlResolved,
                      homePage,
                      favicon,
                      country,
                      state,
                      countryCode,
                      language,
                      codec,
                      userId: user?.id,
                    }).then(
                      () => {
                        client.invalidateQueries(["stations"]);
                        client.invalidateQueries(["stationsIds"]);
                        setIsAddingToList("");
                        toast.success("Rádio adicionado à lista com sucesso");
                      },
                      () => {
                        toast.error("Erro ao adicionar rádio à lista");
                      }
                    );
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        onClick={() => setStationLimit((prev) => prev + 10)}
        isLoading={stationsData.isFetching || stationsData.isLoading}
      >
        Ver mais
      </Button>
    </div>
  );
}
