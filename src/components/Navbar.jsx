import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartSummary } from "../store/features/cartSlice";
import { logoutUser, selectAuthState } from "../store/features/authSlice";

const navItems = [
  { to: "/", label: "Məhsullar", end: true },
  { to: "/about", label: "Haqqımızda" },
  { to: "/support", label: "Dəstək" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Əlaqə" },
];

const Navbar = () => {
  const { totalQuantity } = useSelector(selectCartSummary);
  const { isAuthenticated, currentUser } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-sky-600">
            Trendia
          </Link>
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 bg-sky-500 text-white px-3 py-2 rounded-lg shadow-sm"
            >
              <span>Səbət</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-white text-sky-600 rounded-full">
                {totalQuantity}
              </span>
            </Link>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `font-medium transition-colors lg:text-lg ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-sky-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="hidden md:inline-flex relative items-center gap-2 bg-sky-500 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-sky-600 transition-colors"
          >
            <span>Səbət</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-white text-sky-600 rounded-full">
              {totalQuantity}
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                Salam, {currentUser?.fullName}!
              </span>
              <button
                onClick={handleLogout}
                className="lg:text-lg font-semibold text-slate-600 hover:text-red-600 cursor-pointer"
              >
                Çıxış
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/login"
                className="text-slate-600 hover:text-sky-600 font-medium"
              >
                Daxil ol
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to="/register"
                className="bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Qeydiyyat
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
