import React, { useState } from "react";
import {
  FaGamepad,
  FaChartLine,
  FaClock,
  FaUserEdit,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function GamesManagement() {
  // === Card States ===
  const [totalGames, setTotalGames] = useState(120);
  const [publishedGames, setPublishedGames] = useState(85);
  const [upcomingGames, setUpcomingGames] = useState(12);

  // === Games Data ===
  const [games, setGames] = useState([
    {
      id: 1,
      title: "Legends of Valor",
      genre: "RPG",
      status: "Published",
      releaseDate: "2025-03-15",
      createdAt: "2025-10-20 14:45:10",
      cover: "https://i.pravatar.cc/100?img=10",
    },
    {
      id: 2,
      title: "Star Blaster X",
      genre: "Action",
      status: "Upcoming",
      releaseDate: "2026-01-10",
      createdAt: "2025-10-12 10:22:40",
      cover: "",
    },
  ]);

  // === Popup States ===
  const [selectedGame, setSelectedGame] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    status: "Upcoming",
    releaseDate: "",
    cover: "",
  });

  const handleDelete = (id) => {
    setGames(games.filter((g) => g.id !== id));
  };

  const handleAddGame = () => {
    if (!newGame.title || !newGame.genre)
      return alert("Please fill all fields!");
    setGames([
      ...games,
      {
        ...newGame,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setShowAdd(false);
  };

  const handleEditGame = () => {
    setGames(games.map((g) => (g.id === selectedGame.id ? selectedGame : g)));
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">
      {/* === Dashboard Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Total Games", value: totalGames, icon: <FaGamepad /> },
          {
            title: "Published Games",
            value: publishedGames,
            icon: <FaChartLine />,
          },
          { title: "Upcoming Games", value: upcomingGames, icon: <FaClock /> },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-800 hover:border-red-600 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">{card.title}</span>
              <span className="text-red-600 text-xl">{card.icon}</span>
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* === Games Table === */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-white">Games</h2>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
          >
            <FaPlus /> Add Game
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-3 text-left">Title</th>
                <th className="text-left">Genre</th>
                <th className="text-left">Status</th>
                <th className="text-left">Release Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {games.map((g) => (
                <tr
                  key={g.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-all"
                >
                  <td
                    onClick={() => {
                      setSelectedGame(g);
                      setShowDetails(true);
                    }}
                    className="py-3 cursor-pointer text-red-500 hover:underline"
                  >
                    {g.title}
                  </td>
                  <td>{g.genre}</td>
                  <td
                    className={
                      g.status === "Published"
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  >
                    {g.status}
                  </td>
                  <td>{g.releaseDate}</td>

                  <td className="text-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedGame(g);
                        setShowEdit(true);
                      }}
                      className="hover:text-red-500 transition-all"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-red-600 hover:text-red-400 transition-all"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Game Details Popup === */}
      {showDetails && selectedGame && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 relative border border-gray-800 text-white">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition-all"
              onClick={() => setShowDetails(false)}
            />
            <div className="flex flex-col items-center">
              {selectedGame.cover ? (
                <img
                  src={selectedGame.cover}
                  alt="game-cover"
                  className="w-20 h-20 rounded-lg object-cover border-2 border-red-600 mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-2xl font-semibold text-red-500 mb-3">
                  {selectedGame.title[0]}
                </div>
              )}
              <h3 className="text-xl font-bold">{selectedGame.title}</h3>
              <p className="text-gray-400">{selectedGame.genre}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>
                <strong>Status:</strong> {selectedGame.status}
              </p>
              <p>
                <strong>Release Date:</strong> {selectedGame.releaseDate}
              </p>
              <p>
                <strong>Created:</strong> {selectedGame.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === Add/Edit Popups === */}
      {(showAdd || showEdit) && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 relative border border-gray-800 text-white">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition-all"
              onClick={() => (showAdd ? setShowAdd(false) : setShowEdit(false))}
            />
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
              {showAdd ? "Add Game" : "Edit Game"}
            </h3>

            <input
              type="text"
              placeholder="Game Title"
              value={showAdd ? newGame.title : selectedGame.title}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewGame({ ...newGame, title: e.target.value })
                  : setSelectedGame({ ...selectedGame, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Genre"
              value={showAdd ? newGame.genre : selectedGame.genre}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewGame({ ...newGame, genre: e.target.value })
                  : setSelectedGame({ ...selectedGame, genre: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Release Date"
              value={showAdd ? newGame.releaseDate : selectedGame.releaseDate}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewGame({ ...newGame, releaseDate: e.target.value })
                  : setSelectedGame({
                      ...selectedGame,
                      releaseDate: e.target.value,
                    })
              }
            />

            {/* === Status Dropdown === */}
            <div className="relative mb-3">
              <button
                type="button"
                className="w-full flex justify-between items-center bg-gray-800 text-white p-2 rounded focus:outline-none"
                onClick={() => {
                  if (showAdd)
                    setNewGame({
                      ...newGame,
                      showDropdown: !newGame.showDropdown,
                    });
                  else
                    setSelectedGame({
                      ...selectedGame,
                      showDropdown: !selectedGame.showDropdown,
                    });
                }}
              >
                <span>{showAdd ? newGame.status : selectedGame.status}</span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    (showAdd ? newGame.showDropdown : selectedGame.showDropdown)
                      ? "rotate-180"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {(showAdd ? newGame.showDropdown : selectedGame.showDropdown) && (
                <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg">
                  {["Published", "Upcoming"].map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        if (showAdd) {
                          setNewGame({
                            ...newGame,
                            status,
                            showDropdown: false,
                          });
                        } else {
                          setSelectedGame({
                            ...selectedGame,
                            status,
                            showDropdown: false,
                          });
                        }
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white ${
                        (showAdd ? newGame.status : selectedGame.status) ===
                        status
                          ? "bg-red-600 text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="file"
              className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewGame({ ...newGame, cover: e.target.files[0] })
                  : setSelectedGame({
                      ...selectedGame,
                      cover: e.target.files[0],
                    })
              }
            />
            <button
              onClick={showAdd ? handleAddGame : handleEditGame}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full transition-all"
            >
              {showAdd ? "Add Game" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamesManagement;
