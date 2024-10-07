import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return;

  return (
    <div className="fixed top-0 right-0 lg:w-[30%] md:w-[50%] w-full h-[100vh] bg-white z-50 p-4 border border-gray-200 shadow-lg">
      <IoCloseOutline
        onClick={onClose}
        color="#1267fc"
        size={30}
        cursor="pointer"
      />
      {children}
    </div>
  );
}
