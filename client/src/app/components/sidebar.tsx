"use client";

import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStations,
  getStationsByUserId,
  registerStation,
} from "../services/station";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPlusCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { StationProps } from "../types/station";
import ToolTip from "../components/toolTip";

export default function Sidebar({ currentPage }: { currentPage: number }) {
  const [stationName, setStationName] = useState<string>("");
  const [stationLimit, setStationLimit] = useState<number>(10);
  const [openSidebar, setopenSidebar] = useState(true);

  const { user } = useAuth();

  const client = useQueryClient();

  const stationsData = useQuery({
    queryKey: ["stations", stationName, stationLimit],
    queryFn: () => getStations({ name: stationName, limit: stationLimit }),
  });

  const stationsByUserId = useQuery({
    queryKey: ["stationsByUserId", user?.id, currentPage],
    queryFn: () => getStationsByUserId(user?.id || "", currentPage),
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
        {stationsData.data?.length === 0 ? (
          <p
            className={`${
              openSidebar ? "opacity-100" : "opacity-0"
            } duration-300 whitespace-nowrap`}
          >
            carregando
          </p>
        ) : (
          stationsData.data?.map((station: StationProps) => {
            const stationInListFinded = stationsByUserId.data?.results?.find(
              (x: StationProps) => x.stationuuid === station.stationuuid
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
                    cursor="pointer"
                    onClick={() => {
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
                      }).then(() => {
                        client.invalidateQueries(["stations"]);
                        client.invalidateQueries(["stationsByUserId"]);
                      });
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
      <button onClick={() => setStationLimit((prev) => prev + 10)}>
        Ver mais
      </button>
    </div>
  );
}
