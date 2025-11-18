import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearAuthError,
  selectAuthState,
} from "../store/features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError } = useSelector(selectAuthState);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    if (formData.password.length < 6) {
      setValidationError("Şifrə minimum 6 simvol olmalıdır.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Şifrələr uyğun gəlmir.");
      return;
    }

    dispatch(
      registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })
    );
    if (!authError) {
      setSuccessMessage(
        "Qeydiyyat uğurla tamamlandı! İndi daxil ola bilərsiniz."
      );
      setTimeout(() => navigate("/login"), 1200);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900 text-center">
        Hesab Yarat
      </h1>
      <p className="text-sm text-slate-600 text-center">
        Artıq hesabın var?{" "}
        <Link to="/login" className="text-sky-600 font-medium">
          Daxil ol
        </Link>
      </p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-slate-600">Ad Soyad</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Şifrə</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">
            Şifrə (təkrar)
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-sky-500 focus:ring-sky-500"
            required
          />
        </div>

        {(validationError || authError) && (
          <p className="text-sm text-pink-600">
            {validationError || authError}
          </p>
        )}
        {successMessage && (
          <p className="text-sm text-emerald-600">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg py-2.5 transition-colors"
        >
          Qeydiyyatı tamamla
        </button>
      </form>
    </section>
  );
};

export default Register;
