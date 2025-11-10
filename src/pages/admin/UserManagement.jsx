import React, { useState } from "react";
import {
  FaUsers,
  FaGamepad,
  FaGlobe,
  FaChartLine,
  FaTimes,
  FaUserEdit,
  FaTrash,
  FaBan,
  FaPlus,
} from "react-icons/fa";

function UserManagement() {
  // === Card States ===
  const [totalUsers, setTotalUsers] = useState(3210);
  const [totalVisitors, setTotalVisitors] = useState(12540);
  const [publishedGames, setPublishedGames] = useState(58);

  // === Users Data ===
const [users, setUsers] = useState([
  {
    id: 1,
    username: "ahad9740",
    fullName: "Muhammad Ahad",
    email: "ahad9740@gmail.com",
    role: "admin",
    createdAt: "2025-11-05 05:25:25",
    profile_pic: "https://i.pravatar.cc/100?img=1",
    blocked: "0",
  },
  {
    id: 2,
    username: "ali123",
    fullName: "Ali Raza",
    email: "ali@example.com",
    role: "user",
    createdAt: "2025-11-02 12:15:10",
    profile_pic: "",
    blocked: "1",
  },
]);


  // === Popup States ===
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "user",
    profile_pic: "",
  });

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.fullName)
      return alert("Please fill all fields!");
    setUsers([
      ...users,
      {
        ...newUser,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setShowAdd(false);
  };

  const handleEditUser = () => {
    setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">
      {/* === Dashboard Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Total Visitors", value: totalVisitors, icon: <FaGlobe /> },
          { title: "Total Users", value: totalUsers, icon: <FaUsers /> },
          {
            title: "Published Games",
            value: publishedGames,
            icon: <FaChartLine />,
          },
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

      {/* === Users Table === */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-white">Users</h2>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
          >
            <FaPlus /> Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-3 text-left">Username</th>
                <th className="text-left">Full Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
                <th className="text-left">Blocked</th> {/* 👈 New column */}
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-all"
                >
                  <td
                    onClick={() => {
                      setSelectedUser(u);
                      setShowDetails(true);
                    }}
                    className="py-3 cursor-pointer text-red-500 hover:underline"
                  >
                    {u.username}
                  </td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td
                    className={
                      u.role === "admin" ? "text-red-500" : "text-gray-400"
                    }
                  >
                    {u.role}
                  </td>

                  {/* === Blocked Column === */}
                  <td
                    className={
                      u.blocked === "1" ? "text-red-500" : "text-gray-400"
                    }
                  >
                    {u.blocked === "1" ? "True" : "False"}
                  </td>

                  <td className="text-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setShowEdit(true);
                      }}
                      className="hover:text-red-500 transition-all"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      onClick={() =>
                        setUsers(
                          users.map((usr) =>
                            usr.id === u.id
                              ? {
                                  ...usr,
                                  blocked: usr.blocked === "1" ? "0" : "1",
                                }
                              : usr
                          )
                        )
                      }
                      className="hover:text-red-500 transition-all"
                    >
                      <FaBan />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
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

      {/* === User Details Popup === */}
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 relative border border-gray-800 text-white">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition-all"
              onClick={() => setShowDetails(false)}
            />
            <div className="flex flex-col items-center">
              {selectedUser.profile_pic ? (
                <img
                  src={selectedUser.profile_pic}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-red-600 mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-2xl font-semibold text-red-500 mb-3">
                  {selectedUser.fullName[0]}
                </div>
              )}
              <h3 className="text-xl font-bold">{selectedUser.fullName}</h3>
              <p className="text-gray-400">@{selectedUser.username}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Created:</strong> {selectedUser.createdAt.split(" ")[0]}{" "}
                at {selectedUser.createdAt.split(" ")[1]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === Add/Edit Popups (same style) === */}
      {(showAdd || showEdit) && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 relative border border-gray-800 text-white">
            <FaTimes
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-red-500 transition-all"
              onClick={() => (showAdd ? setShowAdd(false) : setShowEdit(false))}
            />
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
              {showAdd ? "Add User" : "Edit User"}
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              value={showAdd ? newUser.fullName : selectedUser.fullName}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewUser({ ...newUser, fullName: e.target.value })
                  : setSelectedUser({
                      ...selectedUser,
                      fullName: e.target.value,
                    })
              }
            />
            <input
              type="text"
              placeholder="Username"
              value={showAdd ? newUser.username : selectedUser.username}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewUser({ ...newUser, username: e.target.value })
                  : setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={showAdd ? newUser.email : selectedUser.email}
              className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
              onChange={(e) =>
                showAdd
                  ? setNewUser({ ...newUser, email: e.target.value })
                  : setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
            <div className="relative mb-3">
              <button
                type="button"
                className="w-full flex justify-between items-center bg-gray-800 text-white p-2 rounded focus:outline-none"
                onClick={() => {
                  if (showAdd)
                    setNewUser({
                      ...newUser,
                      showDropdown: !newUser.showDropdown,
                    });
                  else
                    setSelectedUser({
                      ...selectedUser,
                      showDropdown: !selectedUser.showDropdown,
                    });
                }}
              >
                <span>
                  {showAdd
                    ? newUser.role.charAt(0).toUpperCase() +
                      newUser.role.slice(1)
                    : selectedUser.role.charAt(0).toUpperCase() +
                      selectedUser.role.slice(1)}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    (showAdd ? newUser.showDropdown : selectedUser.showDropdown)
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

              {(showAdd ? newUser.showDropdown : selectedUser.showDropdown) && (
                <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg">
                  {["user", "admin"].map((role) => (
                    <div
                      key={role}
                      onClick={() => {
                        if (showAdd) {
                          setNewUser({ ...newUser, role, showDropdown: false });
                        } else {
                          setSelectedUser({
                            ...selectedUser,
                            role,
                            showDropdown: false,
                          });
                        }
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white ${
                        (showAdd ? newUser.role : selectedUser.role) === role
                          ? "bg-red-600 text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
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
                  ? setNewUser({ ...newUser, profile_pic: e.target.files[0] })
                  : setSelectedUser({
                      ...selectedUser,
                      profile_pic: e.target.files[0],
                    })
              }
            />
            <button
              onClick={showAdd ? handleAddUser : handleEditUser}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full transition-all"
            >
              {showAdd ? "Add User" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
