import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaGamepad, FaTags } from "react-icons/fa";

function Sidebar() {
  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden lg:flex flex-col w-[20%] min-h-screen bg-gray-900 py-5 px-4 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-5">
          <Link to="/" className="text-3xl font-bold tracking-wide text-white">
            <span className="text-red-600">Play</span>Front
          </Link>
        </div>

        <hr className="border-red-600 mb-6" />

        {/* Navigation Links */}
        <ul className="flex flex-col gap-4">
          {/* Dashboard */}
          <NavLink
            to="/e452b7e4/admin/"
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

          {/* User Management */}
          <NavLink
            to="/e452b7e4/admin/users"
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

          {/* Games Management */}
          <NavLink
            to="/e452b7e4/admin/games"
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

          {/* Deals Management */}
          <NavLink
            to="/e452b7e4/admin/deals"
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

      {/* ===== Mobile Bottom Navbar ===== */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 shadow-2xl flex justify-around py-3 z-50">
        <NavLink
          to="/e452b7e4/admin/"
          end
          className={({ isActive }) =>
            `text-xl transition-colors ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`
          }
        >
          <FaTachometerAlt />
        </NavLink>

        <NavLink
          to="/e452b7e4/admin/users"
          className={({ isActive }) =>
            `text-xl transition-colors ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`
          }
        >
          <FaUsers />
        </NavLink>

        <NavLink
          to="/e452b7e4/admin/games"
          className={({ isActive }) =>
            `text-xl transition-colors ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`
          }
        >
          <FaGamepad />
        </NavLink>

        <NavLink
          to="/e452b7e4/admin/deals"
          className={({ isActive }) =>
            `text-xl transition-colors ${
              isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`
          }
        >
          <FaTags />
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
