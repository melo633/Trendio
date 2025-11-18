import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearAuthError,
  selectAuthState,
} from "../store/features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, isAuthenticated } = useSelector(selectAuthState);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <section className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900 text-center">
        Daxil Ol
      </h1>
      <p className="text-sm text-slate-600 text-center">
        Hesabın yoxdur?{" "}
        <Link to="/register" className="text-sky-600 font-medium">
          Qeydiyyatdan keç
        </Link>
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
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

        {authError && <p className="text-sm text-pink-600">{authError}</p>}

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg py-2.5 transition-colors"
        >
          Daxil ol
        </button>
      </form>
    </section>
  );
};

export default Login;
