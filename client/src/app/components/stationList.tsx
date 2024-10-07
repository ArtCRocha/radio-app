"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { useRef, useState } from "react";
import Modal from "../components/modal";
import useModal from "../hooks/useModal";
import { FaPlay, FaPause, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import Spinner from "../components/spinner";
import { StationListProps } from "../types/station";

export default function StationList({
  stationData,
  stationIsLoading,
}: {
  stationData: StationListProps;
  stationIsLoading: boolean;
}) {
  const [stationName, setStationName] = useState<string>("");

  const { logout, user } = useAuth();
  const { isOpen, closeModal, openModal } = useModal();

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

  const router = useRouter();

  return (
    <>
      <div className="flex-1 bg-white flex flex-col gap-5">
        <div className="py-4 px-10 border border-gray-200 flex justify-between">
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
              logout().then(() => {
                router.push("/login");
              });
            }}
          >
            <IoExitOutline color="#1267fc" size={25} />
            <p className="text-black">Sair</p>
          </button>
        </div>

        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="w-full flex flex-col gap-4 px-10"
        >
          <input
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            placeholder="Buscar por nome da rádio..."
            className={`w-full p-2 border border-gray-300 rounded-md outline-none`}
          />
          <div className="w-full overflow-y-auto flex flex-col gap-4">
            {stationIsLoading ? (
              <Spinner />
            ) : (
              stationData?.results?.map((stationByUserId: any) => {
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
                        src={stationByUserId.url || stationByUserId.urlResolved}
                      />
                      <button
                        onClick={() => togglePlayPause(stationByUserId.id)}
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
                        <p className="text-gray-500 text-sm">Artista</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <MdEdit color="#1267fc" size={25} cursor="pointer" />
                      <FaTrash color="#1267fc" size={20} cursor="pointer" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <p>teste</p>
      </Modal>
    </>
  );
}
