import React, { useState } from "react";
import { FaTags, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Deals_Page() {
  const [selectedDeal, setSelectedDeal] = useState(null);

  const deals = [
    {
      id: 1,
      name: "Call of Duty: Modern Warfare III",
      platform: "PC",
      oldPrice:  59.99,
      newPrice:  39.99,
      description:
        "Experience intense combat, cinematic missions, and cutting-edge graphics in the latest entry of the Modern Warfare saga.",
      image:
        "https://nexusgames.to/wp-content/uploads/2023/11/Call-of-Duty-Modern-Warfare-III-Free-Download-By-Nexus-games.net_.jpg",
    },
    {
      id: 2,
      name: "Grand Theft Auto V",
      platform: "PC",
      oldPrice:  29.99,
      newPrice:  19.99,
      description:
        "Explore Los Santos in one of the most detailed open-world games ever made. Switch between three characters in a massive storyline.",
      image:
        "https://nexusgames.to/wp-content/uploads/2021/01/GTA-5-Free-Download-By-Nexusgames.to-9-366x488.jpg",
    },
    {
      id: 3,
      name: "Arcadegeddon",
      platform: "PC",
      oldPrice:  19.99,
      newPrice:  9.99,
      description:
        "Battle together with friends in this colorful co-op shooter featuring fast-paced action and vibrant arenas.",
      image:
        "https://nexusgames.to/wp-content/uploads/2022/07/Arcadegeddon-.jpg",
    },
    {
      id: 4,
      name: "Cyberpunk 2077: Phantom Liberty",
      platform: "PC",
      oldPrice:  49.99,
      newPrice:  39.99,
      description:
        "Step into Night City once more in this gripping expansion, featuring new missions, areas, and the return of V.",
      image:
        "https://nexusgames.to/wp-content/uploads/2023/09/Cyberpunk-2077-Phantom-Liberty-Free-Download-By-Nexus-games.net_.jpg",
    },
    {
      id: 5,
      name: "Minecraft: Bedrock Edition",
      platform: "PC",
      oldPrice:  19.99,
      newPrice:  9.99,
      description:
        "Build, explore, and survive in a world of blocks — a timeless classic loved by millions worldwide.",
      image:
        "https://nexusgames.to/wp-content/uploads/2024/08/Minecraft-Bedrock-Edition-Free-Download-By-Nexus-games.net_.jpg",
    },
  ];

  return (
    <div className="section mt-12 mb-6 px-4 sm:px-6 lg:px-10 text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-red-500">🔥 Game Deals</h1>
        <p className="text-gray-300">
          Grab exclusive offers before they're gone!
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => setSelectedDeal(deal)}
            className="bg-gray-900 border border-red-600/40 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-red-700/30 transition-shadow duration-300"
          >
            <img
              src={deal.image}
              alt={deal.name}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{deal.name}</h2>
              <p className="text-gray-400 text-sm">{deal.platform}</p>

              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">
                  PKR {deal.oldPrice}
                </span>
                <span className="text-red-500 font-bold">PKR {deal.newPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 border-2 border-red-600 rounded-xl shadow-xl p-6 max-w-lg w-full text-white">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-red-500">
                {selectedDeal.name}
              </h2>
              <button
                onClick={() => setSelectedDeal(null)}
                className="text-red-500 hover:text-white transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Image */}
            <img
              src={selectedDeal.image}
              alt={selectedDeal.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-200 mb-4">{selectedDeal.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTags className="text-red-500" />
                <span className="font-medium">PKR {selectedDeal.newPrice}</span>
              </div>
              <Link
                to={`https://wa.me/923165837272?text=${encodeURIComponent(
                  `I want to buy deal and the selected deal: ${selectedDeal.name}`
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

export default Deals_Page;
