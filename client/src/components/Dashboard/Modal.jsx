import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-500 right-4 top-4 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
