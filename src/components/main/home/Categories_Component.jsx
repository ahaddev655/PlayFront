import React from "react";
import { Link } from "react-router-dom";
import userHeader_data from "../../../data/userHeader_data.json";

function Categories_Component() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold mb-6 text-white tracking-wide">
        Explore Categories
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userHeader_data.map((category, i) => (
          <Link
            to={`/category/${category.path}`}
            key={i}
            className="group relative"
          >
            <div
              className="w-full h-[120px] rounded-xl bg-linear-to-br from-gray-900 to-black border border-red-600 
              shadow-[0_0_10px_#FF00004D] flex flex-col justify-center items-center 
              transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
            >
              <h1
                className="text-xl sm:text-2xl font-medium text-gray-200 group-hover:text-red-500 
                transition-colors duration-300 tracking-wide"
              >
                {category.text}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories_Component;
