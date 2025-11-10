import React, { useState } from "react";

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [admin, setAdmin] = useState({
    username: "ahad9740",
    fullName: "Muhammad Ahad",
    email: "ahad9740@gmail.com",
    role: "admin",
    createdAt: "2025-11-05 05:25:25",
    profile_pic: "https://i.pravatar.cc/100?img=1",
  });

  // Handle password input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Here you’d usually send data to your backend API
    alert("✅ Password changed successfully!");
    setFormData({ newPassword: "", confirmPassword: "" });
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 px-4">
      <div className="backdrop-blur-md bg-white/10 border border-red-700/40 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 text-center font-semibold transition-colors duration-300 ${
              activeTab === "profile"
                ? "bg-red-600 text-white"
                : "bg-transparent text-gray-300 hover:bg-red-800/40"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-3 text-center font-semibold transition-colors duration-300 ${
              activeTab === "settings"
                ? "bg-red-600 text-white"
                : "bg-transparent text-gray-300 hover:bg-red-800/40"
            }`}
          >
            Settings
          </button>
        </div>

        <hr className="border-red-700" />

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="p-6 text-center">
            <img
              src={admin.profile_pic}
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto border-4 border-red-700 shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-white">{admin.fullName}</h2>
            <p className="text-gray-300">@{admin.username}</p>

            <div className="mt-6 text-left space-y-2">
              <p>
                <span className="font-semibold text-gray-100">Email:</span>{" "}
                {admin.email}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Role:</span>{" "}
                <span className="capitalize">{admin.role}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-100">Joined:</span>{" "}
                {admin.createdAt}
              </p>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeTab === "settings" && (
          <div className="p-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-red-500">
              Account Settings
            </h3>
            <button
              onClick={() => setShowPopup(true)}
              className="w-full py-2 bg-gray-800 text-gray-100 font-semibold rounded-md hover:bg-red-800 transition"
            >
              Change Password
            </button>
            <button className="w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition">
              Delete Account
            </button>
          </div>
        )}
      </div>

      {/* Change Password Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-red-700/50 rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl">
            <h2 className="text-xl font-semibold text-red-500 mb-4 text-center">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New Password"
                required
                className="w-full px-4 py-2 rounded-md bg-black/40 border border-red-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-2 rounded-md bg-black/40 border border-red-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
