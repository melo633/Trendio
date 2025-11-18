import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2.5 justify-center items-center py-3.5 border-t border-gray-200">
      <Link to="/" className="text-4xl font-semibold text-sky-600">
        Trendia
      </Link>
      <span>"Keyfiyyətli alış-veriş, rahat həyat!"</span>
    </footer>
  );
};

export default Footer;
