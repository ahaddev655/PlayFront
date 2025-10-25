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
    <div className="xl:px-12 lg:px-6 md:px-3 sm:px-1.5 px-1 flex items-center justify-between bg-gray-900 shadow-xl py-3">
      {/* Logo */}
      <NavLink to={"/"} className="text-2xl text-white font-medium">
        PlayFront
      </NavLink>

      {/* Nav-Links */}
      <ul className="lg:flex items-center justify-center gap-5 hidden">
        {/* Home */}
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `text-lg transition-colors font-medium ${
              isActive ? "text-red-600" : "text-white hover:text-red-600"
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
              : "text-white hover:text-red-600 transition-colors"
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
            <ul className="absolute top-full left-0 mt-2 bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-2 w-40">
              {userHeader_data.map((category, i) => (
                <Link to={`/categories/${category.path}`} key={i}>
                  <li className="hover:bg-red-600/20  text-white hover:text-red-600 transition-colors font-medium px-3 py-1 rounded-md cursor-pointer">
                    {category.text}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </li>

        {/* Deals */}
        <NavLink
          to={"deals"}
          className={({ isActive }) =>
            `text-lg transition-colors font-medium ${
              isActive ? "text-red-600" : "text-white hover:text-red-600"
            }`
          }
        >
          <li>Deals</li>
        </NavLink>

        {/* Up-Coming Games */}
        <NavLink
          to={"upcoming-games"}
          className={({ isActive }) =>
            `text-lg transition-colors font-medium ${
              isActive ? "text-red-600" : "text-white hover:text-red-600"
            }`
          }
        >
          <li>UpComing Games</li>
        </NavLink>
      </ul>

      {/* Extra Icons */}
      <ul className="lg:flex hidden items-center justify-center gap-5">
        <button
          className="text-white hover:text-red-600 transition-colors hover:bg-red-600/20 grid place-items-center w-10 h-10 rounded-md"
          onClick={wishListRedirectFunc}
        >
          <FaHeart />
        </button>
        <button
          className="text-white hover:text-red-600 transition-colors hover:bg-red-600/20 grid place-items-center w-10 h-10 rounded-md"
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
        className={`absolute inset-0 h-screen w-full bg-black/50 backdrop-blur-md transition-opacity duration-300 lg:hidden block ${
          menuToggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-screen sm:w-64 w-full bg-gray-900 py-3 transition-transform duration-300 ${
            menuToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Cross Icon */}
          <div className="px-3 text-end">
            <button type="button">
              <FiX
                className="text-3xl text-red-600 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuToggle(false);
                }}
              />
            </button>
          </div>

          {/* Logo */}
          <div className="px-3 text-center">
            <NavLink to={"/"} className="text-2xl text-white font-medium">
              PlayFront
            </NavLink>
          </div>

          {/* Separator */}
          <hr className="my-3 text-red-600" />

          {/* NavLinks */}
          <ul className="flex flex-col gap-5 px-3">
            {/* Home */}
            <NavLink
              onClick={() => setMenuToggle(false)}
              to={"/"}
              className={({ isActive }) =>
                `text-lg transition-colors font-medium ${
                  isActive ? "text-red-600" : "text-white hover:text-red-600"
                }`
              }
            >
              <li>Home</li>
            </NavLink>

            {/* Category Dropdown */}
            <li
              className={`text-lg cursor-pointer flex flex-col gap-1 font-medium ${
                categoryToggle
                  ? "text-red-600"
                  : "text-white hover:text-red-600 transition-colors"
              }`}
              onClick={() => setCategoryToggle(!categoryToggle)}
            >
              <div
                className="flex items-center gap-1"
                onClick={() => setCategoryToggle(!categoryToggle)}
              >
                Categories
                <IoChevronDown
                  className={`transition-transform duration-150 ease-linear ${
                    categoryToggle ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Dropdown Menu (mobile) */}
              {categoryToggle && (
                <ul className="flex flex-col mt-2">
                  {userHeader_data.map((category, i) => (
                    <Link
                      to={`/categories/${category.path}`}
                      key={i}
                      onClick={() => setMenuToggle(false)}
                    >
                      <li className="px-3 py-1 rounded-md cursor-pointer text-white">
                        {category.text}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>

            {/* Deals */}
            <NavLink
              to={"deals"}
              onClick={() => setMenuToggle(false)}
              className={({ isActive }) =>
                `text-lg transition-colors font-medium ${
                  isActive ? "text-red-600" : "text-white hover:text-red-600"
                }`
              }
            >
              <li>Deals</li>
            </NavLink>

            {/* Up-Coming Games */}
            <NavLink
              onClick={() => setMenuToggle(false)}
              to={"upcoming-games"}
              className={({ isActive }) =>
                `text-lg transition-colors font-medium ${
                  isActive ? "text-red-600" : "text-white hover:text-red-600"
                }`
              }
            >
              <li>UpComing Games</li>
            </NavLink>
          </ul>

          {/* Separator */}
          <hr className="my-3 text-red-600" />

          {/* Extra Icons */}
          <ul className="flex items-center gap-5 px-3">
            <button
              className="text-white hover:text-red-600 transition-colors"
              onClick={wishListRedirectFunc}
            >
              <FaHeart />
            </button>
            <button
              className="text-white hover:text-red-600 transition-colors"
              onClick={profileRedirectFunc}
            >
              <FaUser />
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User_Header;
