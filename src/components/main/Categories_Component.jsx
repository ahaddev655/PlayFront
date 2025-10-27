import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// --- CATEGORY DATA ---
const gameCategoryData = [
  {
    name: "RPG",
    path: "/category/rpg",
    cards: [
      {
        title: "The Witcher 3",
        detail: "Fantasy Open World",
        image:
          "https://cdn1.epicgames.com/offer/3b4a460c6ea34ec19ff47ec2d2b3a84b/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S1_2560x1440-9cf03db58c127fdc503c2e44fcb5f7f2",
      },
      {
        title: "Final Fantasy XVI",
        detail: "Action JRPG",
        image:
          "https://image.api.playstation.com/vulcan/ap/rnd/202212/0218/tYxqj8Lb1QIsw5krTDcPhmxs.jpg",
      },
      {
        title: "Baldur's Gate 3",
        detail: "Classic D&D Rules",
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
        title: "God of War",
        detail: "Hack and Slash",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-368a53088a79b818079d96a035db0f49",
      },
      {
        title: "Cyberpunk 2077",
        detail: "Sci-Fi RPG Shooter",
        image:
          "https://cdn1.epicgames.com/spt-assets/8b91b53756a44a3c8a308d67c0e731c3/cyberpunk-2077-1ytmj.jpg",
      },
      {
        title: "Doom Eternal",
        detail: "Fast-Paced FPS",
        image:
          "https://cdn1.epicgames.com/offer/0d9d2fa3b7b247b89d5188e4204a962a/EGS_DOOMEternal_idSoftware_S1_2560x1440-cb43bdf68d25d302474c5ddf7a07a620",
      },
    ],
  },
  {
    name: "Fighting",
    path: "/category/fighting",
    cards: [
      {
        title: "Street Fighter 6",
        detail: "Competitive Fighting",
        image: "https://cdn1.epicgames.com/offer/fighting/streetfighter6.jpg",
      },
      {
        title: "Mortal Kombat 1",
        detail: "Brutal Fatalities",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_MortalKombat1_NetherRealmStudios_S2_1200x1600-b0d514a2db8367ec7b5d4fdfb0b3b9a1",
      },
      {
        title: "Tekken 8",
        detail: "3D Fighter",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_TEKKEN8_BANDAINAMCOStudiosInc_S2_1200x1600-051e3b8f8a2a0f99e5b255c178c6b079",
      },
    ],
  },
  {
    name: "Adventure",
    path: "/category/adventure",
    cards: [
      {
        title: "Tomb Raider",
        detail: "Exploration Focus",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_ShadwoftheTombRaider_SquareEnix_S2_1200x1600-7a85d3ffae5eaa48fd2ed9cb0e4e42b4",
      },
      {
        title: "Uncharted 4",
        detail: "Cinematic Storytelling",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_UnchartedLegacyofThievesCollection_NaughtyDogLLC_S2_1200x1600-97f4147a29125b76ab4312cf5b8f19f7",
      },
      {
        title: "Zelda: BOTW",
        detail: "Open World Adventure",
        image:
          "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero",
      },
    ],
  },
  {
    name: "Simulation",
    path: "/category/simulation",
    cards: [
      {
        title: "The Sims 4",
        detail: "Life Simulation",
        image: "https://cdn1.epicgames.com/offer/sims4.jpg",
      },
      {
        title: "MS Flight Simulator",
        detail: "Aviation Realism",
        image:
          "https://cdn1.epicgames.com/offer/EGS_MicrosoftFlightSimulator_AsoboStudio_S2_1200x1600-6a60f3a902214a86acbb1bb52c604a1e",
      },
      {
        title: "Planet Zoo",
        detail: "Zoo Management",
        image: "https://cdn1.epicgames.com/offer/planetzoo.jpg",
      },
    ],
  },
  {
    name: "Survival",
    path: "/category/survival",
    cards: [
      {
        title: "Rust",
        detail: "PvP Survival",
        image: "https://cdn1.epicgames.com/offer/rust.jpg",
      },
      {
        title: "Valheim",
        detail: "Viking Exploration",
        image: "https://cdn1.epicgames.com/offer/valheim.jpg",
      },
      {
        title: "Ark: Survival Evolved",
        detail: "Dinosaur Survival",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_ARKSurvivalEvolved_StudioWildcard_S2_1200x1600-700a939d03c26e2fda1cb4f21b05e3e0",
      },
    ],
  },
  {
    name: "Puzzle",
    path: "/category/puzzle",
    cards: [
      {
        title: "Portal 2",
        detail: "Physics Puzzle",
        image: "https://cdn1.epicgames.com/offer/portal2.jpg",
      },
      {
        title: "Tetris Effect",
        detail: "Visual Rhythm Puzzle",
        image: "https://cdn1.epicgames.com/offer/tetris.jpg",
      },
      {
        title: "Baba Is You",
        detail: "Logic Manipulation",
        image: "https://cdn1.epicgames.com/offer/baba.jpg",
      },
    ],
  },
  {
    name: "Racing",
    path: "/category/racing",
    cards: [
      {
        title: "Forza Horizon 5",
        detail: "Open World Racing",
        image: "https://cdn1.epicgames.com/offer/forzahorizon5.jpg",
      },
      {
        title: "Gran Turismo 7",
        detail: "Sim Racing",
        image: "https://cdn1.epicgames.com/offer/granturismo7.jpg",
      },
      {
        title: "Need for Speed Heat",
        detail: "Street Racing",
        image:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_NeedforSpeedHeat_GhostGames_S2_1200x1600-23194aaee8c15dbb9ea49b6b1d940993",
      },
    ],
  },
];

// --- CATEGORY CARDS ---
const CategoryContent = ({ activeCategory }) => {
  if (!activeCategory) {
    return (
      <div className="p-8 text-center text-gray-400 text-lg">
        Select a category tab to view the games.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-3xl font-extrabold mb-6 text-red-400 border-b border-red-900 pb-2">
        {activeCategory.name} Games
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeCategory.cards.map((card, index) => (
          <div
            key={index}
            className="relative group cursor-pointer border-2 border-red-600 overflow-hidden rounded-xl shadow-lg hover:shadow-red-800 transition-all duration-500"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/80 to-red-800/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-xl font-bold text-white">{card.title}</h2>
              <p className="text-gray-300 text-sm mt-2">{card.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
function Categories_Component() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  // Detect path change
  useEffect(() => {
    const matchedCategory = gameCategoryData.find(
      (category) => category.path === location.pathname
    );
    setActiveCategory(matchedCategory || gameCategoryData[0]);
  }, [location.pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    window.history.pushState({}, "", category.path); // Optional: Change URL manually if not using <Link>
  };

  return (
    <div className="min-h-screen bg-linear-to-tl from-black via-red-950 to-black relative text-white pt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex overflow-x-auto justify-center space-x-2 p-2 mb-8 bg-gray-900/70 rounded-xl shadow-inner shadow-black">
          {gameCategoryData.map((category) => {
            const isActive =
              activeCategory && activeCategory.path === category.path;

            const baseClasses =
              "py-3 px-6 text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer rounded-lg";

            const activeClasses = isActive
              ? "bg-red-700 text-white shadow-lg shadow-red-900"
              : "text-gray-300 hover:text-red-300 hover:bg-gray-800/80";

            return (
              <button
                key={category.path}
                className={`${baseClasses} ${activeClasses}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Category Content */}
        <div className="bg-gray-900/50 rounded-xl shadow-2xl">
          <CategoryContent activeCategory={activeCategory} />
        </div>
      </div>
    </div>
  );
}

export default Categories_Component;
