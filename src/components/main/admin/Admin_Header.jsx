import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Admin_Header() {
  const [heading, setHeading] = useState("");
  const path = useLocation();

  useEffect(() => {
    switch (path.pathname) {
      case "/e452b7e4/admin/":
        setHeading("Admin Dashboard");
        break;
      case "/e452b7e4/admin/users":
        setHeading("User Management");
        break;
      case "/e452b7e4/admin/deals":
        setHeading("Deals Management");
        break;
      case "/e452b7e4/admin/games":
        setHeading("Games Management");
        break;
      default:
        setHeading(""); // optional fallback
    }
  }, [path.pathname]); // <-- Runs every time the route changes

  return (
    <div className="section flex items-center justify-between bg-gray-900 shadow-xl py-3 w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-white font-medium">{heading}</h1>
      </div>

      {/* Extra Icons */}
      <div>
        <ul className="flex items-center justify-center gap-5">
          <Link to={"profile"}>
            <button className="hover:text-red-600 transition-colors hover:bg-red-600/20 grid place-items-center w-10 h-10 rounded-md">
              <FaUser />
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Admin_Header;
