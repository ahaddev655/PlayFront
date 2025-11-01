import React, { useEffect, useState } from "react";
import { FaTv, FaHeart } from "react-icons/fa6";

function UpcomingGames_Page() {
  const [wishlist, setWishlist] = useState([]);

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

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  // Add or remove from wishlist
  const toggleWishlist = (game) => {
    const updatedWishlist = wishlist.some((item) => item.id === game.id)
      ? wishlist.filter((item) => item.id !== game.id)
      : [...wishlist, game];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="my-12 section">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => {
          const liked = isInWishlist(game.id);
          return (
            <div key={game.id}>
              <div className="relative group border-2 border-red-600 overflow-hidden p-1">
                {/* Heart Button */}
                <button
                  onClick={() => toggleWishlist(game)}
                  className="absolute top-3 right-3 z-10"
                >
                  <FaHeart
                    className={`text-2xl transition-colors ${
                      liked ? "text-red-500" : "text-white hover:text-red-500"
                    }`}
                  />
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
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingGames_Page;
