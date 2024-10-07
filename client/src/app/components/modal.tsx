import { ReactNode } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return;

  return (
    <>
      <div
        className="fixed top-0 w-[100%] h-[100vh] z-40 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 right-0 lg:w-[30%] md:w-[50%] w-full h-[100vh] bg-white z-50 p-4">
        <AiTwotoneCloseCircle
          onClick={onClose}
          color="#fff"
          size={30}
          cursor="pointer"
        />
        {children}
      </div>
    </>
  );
}
