import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoChevronDown, IoMenu } from "react-icons/io5";
import { FaHeart, FaUser } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import userHeader_data from "../../data/userHeader_data.json";

function User_Header() {
  const [categoryToggle, setCategoryToggle] = useState(false);
  const categoryRef = useRef(null);
  const [wishList, setWishList] = useState(false);
  const [profile, setProfile] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  const wishListRedirectFunc = (e) => {
    e.preventDefault();
    if (wishList === false) {
      navigate("/auth");
      return;
    }
    navigate("/wishlist");
  };

  const profileRedirectFunc = (e) => {
    e.preventDefault();
    if (profile === false) {
      navigate("/auth");
      return;
    }
    navigate("/user-profile");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (window.innerWidth >= 1024) {
        if (
          categoryRef.current &&
          !categoryRef.current.contains(event.target)
        ) {
          setCategoryToggle(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="section flex items-center justify-between bg-gray-900 shadow-xl py-3">
      {/* Logo */}
      <NavLink to={"/"} className="text-2xl font-medium">
        PlayFront
      </NavLink>

      {/* Nav-Links */}
      <ul className="lg:flex items-center justify-center gap-5 hidden">
        {/* Home */}
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `text-lg transition-colors font-medium ${
              isActive ? "text-red-600" : "hover:text-red-600"
            }`
          }
        >
          <li>Home</li>
        </NavLink>

        {/* Category Dropdown */}
        <li
          ref={categoryRef}
          className={`relative text-lg cursor-pointer flex items-center gap-1 font-medium ${
            categoryToggle
              ? "text-red-600"
              : "hover:text-red-600 transition-colors"
          }`}
          onClick={() => setCategoryToggle(!categoryToggle)}
        >
          Categories
          <IoChevronDown
            className={`transition-transform duration-150 ease-linear ${
              categoryToggle ? "rotate-180" : "rotate-0"
            }`}
          />
          {/* Dropdown Menu */}
          {categoryToggle && (
            <ul className="absolute z-10 top-full left-0 mt-2 bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-2 w-40 text-white">
              {userHeader_data.map((category, i) => (
                <Link to={`/category/${category.path}`} key={i}>
                  <li className="hover:bg-red-600/20 hover:text-red-600 transition-colors font-medium px-3 py-1 rounded-md cursor-pointer">
                    {category.text}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </li>

        {/* Deals */}
        <NavLink
          to={"/deals"}
          className={({ isActive }) =>
            `text-lg transition-colors font-medium ${
              isActive ? "text-red-600" : "hover:text-red-600"
            }`
          }
        >
          <li>Deals</li>
        </NavLink>

        {/* Up-Coming Games */}
        <NavLink
          to={"/upcoming-games"}
          className={({ isActive }) =>
            `text-lg transition-colors font-medium ${
              isActive ? "text-red-600" : "hover:text-red-600"
            }`
          }
        >
          <li>UpComing Games</li>
        </NavLink>

        {/* Admin-Dashboard */}
        {role === "admin" ? (
          <NavLink
            to={"/e452b7e4/admin/"}
            className={({ isActive }) =>
              `text-lg transition-colors font-medium ${
                isActive ? "text-red-600" : "hover:text-red-600"
              }`
            }
          >
            <li>Admin Dashboard</li>
          </NavLink>
        ) : (
          ""
        )}
      </ul>

      {/* Extra Icons */}
      <ul className="lg:flex hidden items-center justify-center gap-5">
        <button
          className="hover:text-red-600 transition-colors hover:bg-red-600/20 grid place-items-center w-10 h-10 rounded-md"
          onClick={wishListRedirectFunc}
        >
          <FaHeart />
        </button>
        <button
          className="hover:text-red-600 transition-colors hover:bg-red-600/20 grid place-items-center w-10 h-10 rounded-md"
          onClick={profileRedirectFunc}
        >
          <FaUser />
        </button>
      </ul>

      {/* Mobile-Canvas Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setMenuToggle(true);
        }}
        className="lg:hidden block"
      >
        <IoMenu className="text-3xl text-red-600 hover:text-white transition-colors" />
      </button>

      {/* Mobile-Canvas */}
      <div
        className={`fixed inset-0 h-screen w-full bg-black/60 backdrop-blur-sm overflow-y-auto transition-all duration-300 ease-in-out lg:hidden block z-50 ${
          menuToggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Sidebar Container */}
        <div
          className={`absolute left-0 top-0 min-h-screen sm:w-72 w-full bg-gray-900 py-5 px-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
            menuToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Top Section */}
          <div>
            {/* Close Button */}
            <div className="text-end mb-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuToggle(false);
                }}
                className="text-red-500 hover:text-white transition-colors"
              >
                <FiX className="text-3xl" />
              </button>
            </div>

            {/* Logo */}
            <div className="text-center mb-5">
              <NavLink
                to={"/"}
                className="text-3xl font-bold tracking-wide"
                onClick={() => setMenuToggle(false)}
              >
                <span className="text-red-600">Play</span>Front
              </NavLink>
            </div>

            <hr className="border-red-600 mb-6" />

            {/* Navigation Links */}
            <ul className="flex flex-col gap-4">
              {/* Home */}
              <NavLink
                to={"/"}
                onClick={() => setMenuToggle(false)}
                className={({ isActive }) =>
                  `text-lg font-medium rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-red-600/10 hover:text-red-500"
                  }`
                }
              >
                Home
              </NavLink>

              {/* Categories */}
              <li className="text-lg font-medium">
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                    categoryToggle
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-red-600/10 hover:text-red-500"
                  }`}
                  onClick={() => setCategoryToggle(!categoryToggle)}
                >
                  <span>Categories</span>
                  <IoChevronDown
                    className={`transition-transform duration-200 ${
                      categoryToggle ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {categoryToggle && (
                  <ul className="flex flex-col mt-2 pl-4 space-y-1 border-l border-red-600/40">
                    {userHeader_data.map((category, i) => (
                      <Link
                        to={`/category/${category.path}`}
                        key={i}
                        onClick={() => setMenuToggle(false)}
                      >
                        <li className="px-3 py-1.5 rounded-md text-gray-300 hover:bg-red-600/20 hover:text-white transition-colors">
                          {category.text}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>

              {/* Deals */}
              <NavLink
                to={"/deals"}
                onClick={() => setMenuToggle(false)}
                className={({ isActive }) =>
                  `text-lg font-medium rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-red-600/10 hover:text-red-500"
                  }`
                }
              >
                Deals
              </NavLink>

              {/* Upcoming Games */}
              <NavLink
                to={"/upcoming-games"}
                onClick={() => setMenuToggle(false)}
                className={({ isActive }) =>
                  `text-lg font-medium rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-red-600/10 hover:text-red-500"
                  }`
                }
              >
                UpComing Games
              </NavLink>

              {/* Admin-Dashboard */}
              {role === "admin" ? (
                <NavLink
                  to={"/e452b7e4/admin/"}
                  className={({ isActive }) =>
                    `text-lg font-medium rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-red-600/10 hover:text-red-500"
                    }`
                  }
                >
                  <li>Admin Dashboard</li>
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </div>

          {/* Bottom Section */}
          <div>
            <hr className="border-red-600 my-4" />
            <div className="flex items-center justify-around">
              <button
                className="text-gray-300 hover:text-red-500 transition-colors"
                onClick={wishListRedirectFunc}
              >
                <FaHeart className="text-2xl" />
              </button>
              <button
                className="text-gray-300 hover:text-red-500 transition-colors"
                onClick={profileRedirectFunc}
              >
                <FaUser className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_Header;
