import React from "react";
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-slate-100 hover:bg-slate-200 w-8 h-8 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          ×
        </button>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
