import React from "react";

import Modal from "./Modal";

const SuccessModal = ({ isOpen, onClose, summary }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Təbriklər!">
    <p className="text-slate-600">
      Sifarişiniz uğurla qəbul edildi. Qısa müddət ərzində təsdiq e-poçtu (
      <span className="font-medium text-sky-600">{summary?.email}</span>)
      ünvanınıza göndəriləcək.
    </p>
    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-sky-700">
      <p className="text-sm">
        <span className="font-semibold">Ünvan:</span> {summary?.address},{" "}
        {summary?.city} {summary?.postalCode}
      </p>
      <p className="text-sm mt-1">
        <span className="font-semibold">Müştəri:</span> {summary?.fullName}
      </p>
    </div>
    <button
      onClick={onClose}
      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg py-2.5 transition-colors"
    >
      Bağla
    </button>
  </Modal>
);

export default SuccessModal;
