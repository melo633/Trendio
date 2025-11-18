import React from "react";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { loadAuthFromStorage } from "../store/features/authSlice";
import Footer from "./Footer";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
