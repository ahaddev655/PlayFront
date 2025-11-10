import React, { useState } from "react";
import {
  FaTags,
  FaBolt,
  FaClock,
  FaUserEdit,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function DealsManagement() {
  // === Card States ===
  const [totalDeals, setTotalDeals] = useState(120);
  const [activeDeals, setActiveDeals] = useState(85);
  const [upcomingDeals, setUpcomingDeals] = useState(12);

  // === Deals Data ===
  const [deals, setDeals] = useState([
    {
      id: 1,
      title: "Holiday Discount 50%",
      category: "Seasonal",
      status: "Active",
      expiryDate: "2025-12-25",
      createdAt: "2025-10-20 14:45:10",
      banner: "https://i.pravatar.cc/100?img=50",
    },
    {
      id: 2,
      title: "New Year Mega Sale",
      category: "Event",
      status: "Upcoming",
      expiryDate: "2026-01-10",
      createdAt: "2025-10-12 10:22:40",
      banner: "",
    },
  ]);

  // === Popup States ===
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [newDeal, setNewDeal] = useState({
    title: "",
    category: "",
    status: "Upcoming",
    expiryDate: "",
    banner: "",
  });

  const handleDelete = (id) => {
    setDeals(deals.filter((d) => d.id !== id));
  };

  const handleAddDeal = () => {
    if (!newDeal.title || !newDeal.category)
      return alert("Please fill all fields!");
    setDeals([
      ...deals,
      {
        ...newDeal,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setShowAdd(false);
  };

  const handleEditDeal = () => {
    setDeals(deals.map((d) => (d.id === selectedDeal.id ? selectedDeal : d)));
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">
      {/* === Dashboard Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Total Deals", value: totalDeals, icon: <FaTags /> },
          { title: "Active Deals", value: activeDeals, icon: <FaBolt /> },
          { title: "Upcoming Deals", value: upcomingDeals, icon: <FaClock /> },
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

      {/* === Deals Table === */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-white">Deals</h2>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
          >
            <FaPlus /> Add Deal
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-3 text-left">Title</th>
                <th className="text-left">Category</th>
                <th className="text-left">Status</th>
                <th className="text-left">Expiry Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {deals.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-all"
                >
                  <td
                    onClick={() => {
                      setSelectedDeal(d);
                      setShowDetails(true);
                    }}
                    className="py-3 cursor-pointer text-red-500 hover:underline"
                  >
                    {d.title}
                  </td>
                  <td>{d.category}</td>
                  <td
                    className={
                      d.status === "Active" ? "text-red-500" : "text-gray-400"
                    }
                  >
                    {d.status}
                  </td>
                  <td>{d.expiryDate}</td>

                  <td className="text-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedDeal(d);
                        setShowEdit(true);
                      }}
                      className="hover:text-red-500 transition-all"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
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

      {/* === Deal Details Popup === */}
      {showDetails && selectedDeal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 relative border border-gray-800 text-white">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition-all"
              onClick={() => setShowDetails(false)}
            />
            <div className="flex flex-col items-center">
              {selectedDeal.banner ? (
                <img
                  src={selectedDeal.banner}
                  alt="deal-banner"
                  className="w-20 h-20 rounded-lg object-cover border-2 border-red-600 mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-2xl font-semibold text-red-500 mb-3">
                  {selectedDeal.title[0]}
                </div>
              )}
              <h3 className="text-xl font-bold">{selectedDeal.title}</h3>
              <p className="text-gray-400">{selectedDeal.category}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>
                <strong>Status:</strong> {selectedDeal.status}
              </p>
              <p>
                <strong>Expiry Date:</strong> {selectedDeal.expiryDate}
              </p>
              <p>
                <strong>Created:</strong> {selectedDeal.createdAt.split("T")[0]}
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
              {showAdd ? "Add Deal" : "Edit Deal"}
            </h3>

            <input
              type="text"
              placeholder="Deal Title"
              value={showAdd ? newDeal.title : selectedDeal.title}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewDeal({ ...newDeal, title: e.target.value })
                  : setSelectedDeal({ ...selectedDeal, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              value={showAdd ? newDeal.category : selectedDeal.category}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewDeal({ ...newDeal, category: e.target.value })
                  : setSelectedDeal({
                      ...selectedDeal,
                      category: e.target.value,
                    })
              }
            />
            <input
              type="date"
              placeholder="Expiry Date"
              value={showAdd ? newDeal.expiryDate : selectedDeal.expiryDate}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewDeal({ ...newDeal, expiryDate: e.target.value })
                  : setSelectedDeal({
                      ...selectedDeal,
                      expiryDate: e.target.value,
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
                    setNewDeal({
                      ...newDeal,
                      showDropdown: !newDeal.showDropdown,
                    });
                  else
                    setSelectedDeal({
                      ...selectedDeal,
                      showDropdown: !selectedDeal.showDropdown,
                    });
                }}
              >
                <span>{showAdd ? newDeal.status : selectedDeal.status}</span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    (showAdd ? newDeal.showDropdown : selectedDeal.showDropdown)
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

              {(showAdd ? newDeal.showDropdown : selectedDeal.showDropdown) && (
                <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg">
                  {["Active", "Upcoming"].map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        if (showAdd) {
                          setNewDeal({
                            ...newDeal,
                            status,
                            showDropdown: false,
                          });
                        } else {
                          setSelectedDeal({
                            ...selectedDeal,
                            status,
                            showDropdown: false,
                          });
                        }
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white ${
                        (showAdd ? newDeal.status : selectedDeal.status) ===
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
                  ? setNewDeal({ ...newDeal, banner: e.target.files[0] })
                  : setSelectedDeal({
                      ...selectedDeal,
                      banner: e.target.files[0],
                    })
              }
            />
            <button
              onClick={showAdd ? handleAddDeal : handleEditDeal}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full transition-all"
            >
              {showAdd ? "Add Deal" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DealsManagement;
