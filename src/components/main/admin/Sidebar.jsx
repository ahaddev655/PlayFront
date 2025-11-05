import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <div className="w-full lg:w-[20%] min-h-screen sm:w-72 bg-gray-900 py-5 px-4 flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="text-center mb-5">
        <Link
          to={"/"}
          className="text-3xl font-bold tracking-wide"
          onClick={() => setMenuToggle(false)}
        >
          <span className="text-red-600">Play</span>Front
        </Link>
      </div>
      <hr className="border-red-600 mb-6" />
      <ul className="flex flex-col gap-4">
        {/* Admin-Dashboard */}
        <NavLink
          to={"/e452b7e4/admin/"}
          end
          className={({ isActive }) =>
            `transition-colors font-medium px-4 py-3 rounded-md cursor-pointer ${
              isActive
                ? "bg-red-600/20 text-red-600"
                : "hover:bg-red-600/20 text-white hover:text-red-600"
            }`
          }
        >
          <li>Dashboard</li>
        </NavLink>

        {/* User-Management */}
        <NavLink
          to={"/e452b7e4/admin/users"}
          end
          className={({ isActive }) =>
            `transition-colors font-medium px-4 py-3 rounded-md cursor-pointer ${
              isActive
                ? "bg-red-600/20 text-red-600"
                : "hover:bg-red-600/20 text-white hover:text-red-600"
            }`
          }
        >
          <li>User Management</li>
        </NavLink>

        {/* Games-Management */}
        <NavLink
          to={"/e452b7e4/admin/games"}
          end
          className={({ isActive }) =>
            `transition-colors font-medium px-4 py-3 rounded-md cursor-pointer ${
              isActive
                ? "bg-red-600/20 text-red-600"
                : "hover:bg-red-600/20 text-white hover:text-red-600"
            }`
          }
        >
          <li>Games Management</li>
        </NavLink>

        {/* Deals-Management */}
        <NavLink
          to={"/e452b7e4/admin/deals"}
          end
          className={({ isActive }) =>
            `transition-colors font-medium px-4 py-3 rounded-md cursor-pointer ${
              isActive
                ? "bg-red-600/20 text-red-600"
                : "hover:bg-red-600/20 text-white hover:text-red-600"
            }`
          }
        >
          <li>Deals Management</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
