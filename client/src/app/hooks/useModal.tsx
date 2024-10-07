import { useState } from "react";

interface OpenModal {
  data?: any;
  type?: string;
}

export default function useModal() {
  const [show, setShow] = useState<string | boolean>(false);
  const [data, setData] = useState<any>();

  function openModal({ data, type }: OpenModal) {
    setData(data);
    setShow(type || true);
  }

  function closeModal() {
    setShow(false);
  }

  return { isOpen: show, openModal, closeModal, data };
}
