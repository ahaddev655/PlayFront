import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTags, FaTv } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function WishList_Page() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setGames(saved);
  }, []);

  const handleDelete = (id) => {
    const updated = games.filter((game) => game.id !== id);
    setGames(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="my-12 section px-4">
      {/* 🔙 Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-medium"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* Games Grid */}
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game) => (
            <div key={game.id}>
              <div
                onClick={() => setSelectedGame(game)}
                className="relative group border-2 border-red-600 overflow-hidden p-1"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(game.id);
                  }}
                  className="text-red-500 hover:text-white transition absolute top-2 right-2 z-10"
                >
                  <FaTimes size={20} />
                </button>

                {/* Game Image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-96 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-black/80 to-red-600/80 opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-0 transition-all duration-500"></div>

                {/* Game Name */}
                <h2 className="absolute -right-[500px] text-center top-1/2 text-xl font-semibold text-white group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-500">
                  {game.name}
                </h2>

                {/* Platform Info */}
                <div className="absolute left-3.5 bottom-3.5 flex items-center gap-2 transform group-hover:translate-y-[100px] transition-transform duration-500">
                  <FaTv className="text-red-500" />
                  <p className="text-xs font-medium">{game.platform}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty Wishlist Message
        <div className="text-center text-gray-400 mt-16">
          <p className="text-xl font-medium">Your wishlist is empty</p>
          <p className="text-sm text-gray-500 mt-2">
            Add games you love to see them here.
          </p>
        </div>
      )}
    </div>
  );
}

export default WishList_Page;
