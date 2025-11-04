import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTv, FaTags } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

// --- CATEGORY DATA ---
const gameCategoryData = [
  {
    name: "RPG",
    path: "/category/rpg",
    cards: [
      {
        name: "The Witcher 3",
        category: "RPG",
        platform: "PC / PS5 / Xbox",
        description:
          "An immersive fantasy RPG with rich storytelling and open-world exploration.",
        price: "$39.99",
        image:
          "https://cdn1.epicgames.com/offer/3b4a460c6ea34ec19ff47ec2d2b3a84b/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S1_2560x1440-9cf03db58c127fdc503c2e44fcb5f7f2",
      },
      {
        name: "Final Fantasy XVI",
        category: "RPG",
        platform: "PS5",
        description:
          "An epic fantasy adventure with fast-paced combat and cinematic storytelling.",
        price: "$59.99",
        image:
          "https://image.api.playstation.com/vulcan/ap/rnd/202212/0218/tYxqj8Lb1QIsw5krTDcPhmxs.jpg",
      },
      {
        name: "Baldur’s Gate 3",
        category: "RPG",
        platform: "PC / PS5",
        description:
          "Classic D&D-based role-playing with deep story and character choices.",
        price: "$69.99",
        image:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
      },
    ],
  },
  {
    name: "Action",
    path: "/category/action",
    cards: [
      {
        name: "God of War",
        category: "Action",
        platform: "PC / PS5",
        description:
          "A mythological action-adventure featuring Kratos and his son Atreus.",
        price: "$49.99",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-368a53088a79b818079d96a035db0f49",
      },
      {
        name: "Cyberpunk 2077",
        category: "Action",
        platform: "PC / PS5 / Xbox",
        description: "A futuristic open-world RPG shooter set in Night City.",
        price: "$59.99",
        image:
          "https://cdn1.epicgames.com/spt-assets/8b91b53756a44a3c8a308d67c0e731c3/cyberpunk-2077-1ytmj.jpg",
      },
      {
        name: "Doom Eternal",
        category: "Action",
        platform: "PC / PS5 / Xbox",
        description:
          "Fast-paced first-person shooter with brutal demon-slaying gameplay.",
        price: "$39.99",
        image:
          "https://cdn1.epicgames.com/offer/0d9d2fa3b7b247b89d5188e4204a962a/EGS_DOOMEternal_idSoftware_S1_2560x1440-cb43bdf68d25d302474c5ddf7a07a620",
      },
    ],
  },
];

// --- MAIN COMPONENT ---
function Categories_Component() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  // Detect category based on URL
  useEffect(() => {
    const matchedCategory = gameCategoryData.find(
      (category) => category.path === location.pathname,
    );
    setActiveCategory(matchedCategory || null);
  }, [location.pathname]);

  if (!activeCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Games not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-tl from-black via-red-950 to-black py-12 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-500 mb-8 border-b border-red-700 pb-2">
          {activeCategory.name} Games
        </h1>

        {/* --- Games Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeCategory.cards.map((game, i) => (
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

              {/* Platform Tag */}
              <div className="absolute left-3.5 bottom-3.5 flex items-center gap-2 transform group-hover:translate-y-[100px] transition-transform duration-500">
                <FaTv className="text-red-500" />
                <p className="text-xs font-medium">{game.platform}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Popup Modal --- */}
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
                    `I want to buy ${selectedGame.name}`,
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
    </div>
  );
}

export default Categories_Component;
