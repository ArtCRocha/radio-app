"use client";

import { useRef, useState } from "react";
import Modal from "../components/modal";
import useModal from "../hooks/useModal";
import { FaPlay, FaPause, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Spinner from "../components/spinner";
import { StationListProps, StationWithId } from "../types/station";
import FormEditStation from "./formEditStation";
import FormDeleteStation from "./formRemoveStation";

export default function StationList({
  stationData,
  stationIsLoading,
}: {
  stationData: StationListProps;
  stationIsLoading: boolean;
}) {
  const { isOpen, closeModal, openModal, data } = useModal();

  const [playingStationId, setPlayingStationId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const togglePlayPause = (stationId: string) => {
    const currentAudio = audioRefs.current[stationId];

    if (currentAudio) {
      if (playingStationId === stationId) {
        currentAudio.pause();
        setPlayingStationId(null);
      } else {
        if (playingStationId && audioRefs.current[playingStationId]) {
          audioRefs.current[playingStationId]?.pause();
        }

        currentAudio.play();
        setPlayingStationId(stationId);
      }
    }
  };

  return (
    <>
      <div className="flex-1 bg-white flex flex-col gap-5">
        <div
          style={{ height: "calc(100vh - 250px)" }}
          className="w-full flex flex-col gap-4 px-10"
        >
          <div className="w-full overflow-y-auto flex flex-col gap-4">
            {stationIsLoading ? (
              <Spinner />
            ) : (
              <>
                {stationData?.results?.length === 0 ? (
                  <p className="text-black">
                    Você não possui rádios adicioandas à sua lista. Clique no
                    botão + na rádio que deseja ouvir para adicionar.
                  </p>
                ) : (
                  stationData?.results?.map(
                    (stationByUserId: StationWithId) => {
                      return (
                        <div
                          key={stationByUserId.id}
                          className="bg-white w-full p-4 rounded-lg shadow-lg flex justify-between items-center border border-gray-200"
                        >
                          <div className="flex items-center space-x-4">
                            <audio
                              ref={(el) => {
                                audioRefs.current[stationByUserId.id] = el;
                              }}
                              src={
                                stationByUserId.url ||
                                stationByUserId.urlResolved
                              }
                            />
                            <button
                              onClick={() =>
                                togglePlayPause(stationByUserId.id)
                              }
                              className="bg-[#1267fc] text-white w-12 h-12 flex items-center justify-center rounded-full focus:outline-none"
                            >
                              {playingStationId === stationByUserId.id ? (
                                <FaPause color="#ffffff" size={15} />
                              ) : (
                                <FaPlay color="#ffffff" size={15} />
                              )}
                            </button>
                            <div className="flex flex-col">
                              <h3
                                className="text-black font-semibold"
                                dangerouslySetInnerHTML={{
                                  __html: stationByUserId.name,
                                }}
                              ></h3>
                              <p className="text-gray-500 text-sm">
                                {stationByUserId.country}{" "}
                                {stationByUserId.countryCode}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {stationByUserId.language}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <MdEdit
                              color="#1267fc"
                              size={25}
                              cursor="pointer"
                              onClick={() =>
                                openModal({
                                  data: stationByUserId,
                                  type: "edit",
                                })
                              }
                            />
                            <FaTrash
                              color="#1267fc"
                              size={20}
                              cursor="pointer"
                              onClick={() =>
                                openModal({
                                  data: stationByUserId,
                                  type: "delete",
                                })
                              }
                            />
                          </div>
                        </div>
                      );
                    }
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen === "edit"} onClose={closeModal}>
        {data && (
          <FormEditStation
            stationData={data}
            stationId={data?.id}
            onClose={closeModal}
          />
        )}
      </Modal>
      <Modal isOpen={isOpen === "delete"} onClose={closeModal}>
        {data && (
          <FormDeleteStation
            stationName={data?.name}
            stationId={data?.id}
            onClose={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
