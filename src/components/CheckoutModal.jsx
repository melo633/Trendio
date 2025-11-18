import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const defaultForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const CheckoutModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Ad Soyad tələb olunur";
    if (!formData.email.includes("@")) newErrors.email = "Etibarlı email yazın";
    if (!formData.address.trim()) newErrors.address = "Ünvan boş ola bilməz";
    if (!formData.city.trim()) newErrors.city = "Şəhər göstərilməlidir";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Poçt kodu tələb olunur";
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, "")))
      newErrors.cardNumber = "Kart nömrəsi 16 rəqəm olmalıdır";
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry))
      newErrors.expiry = "MM/YY formatında yazın";
    if (!/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = "CVV 3-4 rəqəm olmalıdır";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData(defaultForm);
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sifariş Məlumatları">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-slate-600">Ad Soyad</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
          />
          {errors.fullName && (
            <p className="text-xs text-pink-600 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
          />
          {errors.email && (
            <p className="text-xs text-pink-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">Ünvan</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
          />
          {errors.address && (
            <p className="text-xs text-pink-600 mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-slate-600">Şəhər</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            />
            {errors.city && (
              <p className="text-xs text-pink-600 mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Poçt Kodu
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            />
            {errors.postalCode && (
              <p className="text-xs text-pink-600 mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">
            Kart nömrəsi
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234123412341234"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
          />
          {errors.cardNumber && (
            <p className="text-xs text-pink-600 mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-slate-600">
              Son istifadə tarixi (MM/YY)
            </label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="10/27"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            />
            {errors.expiry && (
              <p className="text-xs text-pink-600 mt-1">{errors.expiry}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            />
            {errors.cvv && (
              <p className="text-xs text-pink-600 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg py-2.5 transition-colors"
        >
          Sifarişi tamamla
        </button>
      </form>
    </Modal>
  );
};

export default CheckoutModal;
