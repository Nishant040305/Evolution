import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg">
        <button
          onClick={() => onClose(false)}
          className="absolute text-gray-500 right-4 top-4 z-10 hover:text-gray-950"
          style={{ padding: '0.5rem', background: 'transparent' }}
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
