import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-2 border-b border-gray-700 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Notebook Title */}
        <h1 className="text-2xl font-extrabold text-blue-400 tracking-wide">
          PasteApp
        </h1>

        {/* Notebook Tabs */}
        <div className="flex gap-4 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-xl transition ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-xl transition ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
