import React, { useState } from "react";
import { FaTags, FaTv } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function UpComingGames_Component() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      name: "Call of Duty: Modern Warfare III",
      category: "Action / Shooter",
      platform: "PC",
      price: "PKR 59.99",
      description:
        "Experience intense combat, cinematic missions, and cutting-edge graphics in the latest entry of the Modern Warfare saga.",
      image:
        "https://nexusgames.to/wp-content/uploads/2023/11/Call-of-Duty-Modern-Warfare-III-Free-Download-By-Nexus-games.net_.jpg",
    },
    {
      id: 2,
      name: "Grand Theft Auto V",
      category: "Action / Open World",
      platform: "PC",
      price: "PKR 29.99",
      description:
        "Explore Los Santos in one of the most detailed open-world games ever made. Switch between three characters in a massive storyline.",
      image:
        "https://nexusgames.to/wp-content/uploads/2021/01/GTA-5-Free-Download-By-Nexusgames.to-9-366x488.jpg",
    },
    {
      id: 3,
      name: "Arcadegeddon",
      category: "Multiplayer / Action",
      platform: "PC",
      price: "PKR 19.99",
      description:
        "Battle together with friends in this colorful co-op shooter featuring fast-paced action and vibrant arenas.",
      image:
        "https://nexusgames.to/wp-content/uploads/2022/07/Arcadegeddon-.jpg",
    },
    {
      id: 4,
      name: "Cyberpunk 2077: Phantom Liberty",
      category: "RPG / Sci-Fi",
      platform: "PC",
      price: "PKR 49.99",
      description:
        "Step into Night City once more in this gripping expansion, featuring new missions, areas, and the return of V.",
      image:
        "https://nexusgames.to/wp-content/uploads/2023/09/Cyberpunk-2077-Phantom-Liberty-Free-Download-By-Nexus-games.net_.jpg",
    },
    {
      id: 5,
      name: "Minecraft: Bedrock Edition",
      category: "Sandbox / Adventure",
      platform: "PC",
      price: "PKR 19.99",
      description:
        "Build, explore, and survive in a world of blocks — a timeless classic loved by millions worldwide.",
      image:
        "https://nexusgames.to/wp-content/uploads/2024/08/Minecraft-Bedrock-Edition-Free-Download-By-Nexus-games.net_.jpg",
    },
  ];

  const filteredGames = games.slice(0, 4);

  return (
    <div className="my-12">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-medium">UpComing Games</h1>
        <Link to={"/upcoming-games"}>
          <button
            type="button"
            className="rounded-md py-3 px-6 bg-linear-to-br from-gray-900 to-black border border-red-600 
              shadow-[0_0_10px_#FF00004D] flex flex-col justify-center items-center 
              transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] font-medium
              text-gray-200 group-hover:text-red-500 tracking-wide"
          >
            View All
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredGames.map((game, i) => (
          <div
            onClick={() => setSelectedGame(game)}
            className="relative group cursor-pointer border-2 border-red-600 overflow-hidden p-1"
            key={i}
          >
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

            {/* Platform Tag (always visible, slides down slightly on hover) */}
            <div className="absolute left-3.5 bottom-3.5 flex items-center gap-2 transform group-hover:translate-y-[100px] transition-transform duration-500">
              <FaTv className="text-red-500" />
              <p className="text-xs font-medium">{game.platform}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 border-2 border-red-600 rounded-xl shadow-xl p-6 max-w-lg w-full text-white">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-red-500">
                {selectedGame.name}
              </h2>
              <button
                onClick={() => setSelectedGame(null)}
                className="text-red-500 hover:text-white transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <img
              src={selectedGame.image}
              alt={selectedGame.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-300 mb-3">
              {selectedGame.category} — {selectedGame.platform}
            </p>
            <p className="text-gray-200 mb-4">{selectedGame.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTags className="text-red-500" />
                <span className="font-medium">{selectedGame.price}</span>
              </div>
              <Link
                to={`https://wa.me/923165837272?text=${encodeURIComponent(
                  `I have to buy ${selectedGame.name}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpComingGames_Component;
