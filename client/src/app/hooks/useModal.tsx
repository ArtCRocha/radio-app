import { useState } from "react";

interface OpenModal {
  data?: any;
}

export default function useModal() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>();

  function openModal({ data }: OpenModal) {
    setData(data);
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }

  return { isOpen: show, openModal, closeModal, data };
}
