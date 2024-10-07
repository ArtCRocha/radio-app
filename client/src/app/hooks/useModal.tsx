import { useState } from "react";
import { StationWithId } from "../types/station";

interface OpenModal {
  data?: StationWithId;
  type?: string;
}

export default function useModal() {
  const [show, setShow] = useState<string | boolean>(false);
  const [data, setData] = useState<StationWithId>();

  function openModal({ data, type }: OpenModal) {
    setData(data);
    setShow(type || true);
  }

  function closeModal() {
    setShow(false);
  }

  return { isOpen: show, openModal, closeModal, data };
}
