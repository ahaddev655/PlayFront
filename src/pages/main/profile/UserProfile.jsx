import React, { useState } from "react";
import {
  FaUserAlt,
  FaEnvelope,
  FaEdit,
  FaCog,
  FaUserCircle,
  FaTimes,
  FaSave,
  FaLock,
  FaImage,
} from "react-icons/fa";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);

  // --- Profile Data State ---
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  // --- Editable Fields State ---
  const [editData, setEditData] = useState({
    username: profile.username,
    email: profile.email,
    image: profile.image,
  });

  // Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Profile Changes
  const handleSaveProfile = () => {
    setProfile((prev) => ({
      ...prev,
      username: editData.username,
      email: editData.email,
      image: editData.image,
    }));
    setShowProfileEdit(false);
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-black via-red-950 to-black relative text-white flex items-center justify-center p-6">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_gray_400,_transparent_60%)]"></div>

      {/* Main Card */}
      <div className="relative z-10 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-700">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 w-full justify-center py-3 font-semibold transition 
              ${
                activeTab === "profile"
                  ? "text-red-400 border-b-2 border-red-600"
                  : "text-gray-400 hover:text-gray-200"
              }`}
          >
            <FaUserCircle /> Profile
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 w-full justify-center py-3 font-semibold transition 
              ${
                activeTab === "settings"
                  ? "text-red-400 border-b-2 border-red-600"
                  : "text-gray-400 hover:text-gray-200"
              }`}
          >
            <FaCog /> Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-8 text-center">
            <div className="flex flex-col items-center mb-6">
              <img
                src={profile.image}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-red-700 shadow-lg object-cover"
              />
              <h2 className="text-2xl font-semibold mt-4 text-red-400">
                {profile.name}
              </h2>
              <p className="text-gray-400 text-sm">{profile.role}</p>
            </div>

            <div className="space-y-4 text-left mt-6">
              <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
                <FaUserAlt className="text-red-500" />
                <p className="text-gray-300">
                  Username:{" "}
                  <span className="text-white font-medium">
                    {profile.username}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
                <FaEnvelope className="text-red-500" />
                <p className="text-gray-300">
                  Email:{" "}
                  <span className="text-white font-medium">
                    {profile.email}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  setEditData({
                    username: profile.username,
                    email: profile.email,
                    image: profile.image,
                  });
                  setShowProfileEdit(true);
                }}
                className="w-full py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="p-8 text-left space-y-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">
              Change Password
            </h3>

            <div className="text-gray-400">
              <p className="text-sm mb-4">
                Secure your account by updating your password.
              </p>
            </div>

            <button
              onClick={() => setShowPasswordEdit(true)}
              className="w-full py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <FaLock /> Change Password
            </button>
          </div>
        )}
      </div>

      {/* ===== Edit Profile Popup ===== */}
      {showProfileEdit && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-10">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-80 relative shadow-lg animate-fadeIn">
            <button
              onClick={() => setShowProfileEdit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold text-red-400 mb-4 text-center">
              Edit Profile
            </h2>

            <div className="space-y-4">
              {/* Image Preview */}
              <div className="flex flex-col items-center">
                <img
                  src={editData.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-full border-2 border-red-600 object-cover mb-3"
                />
                <label className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer hover:border-red-600 transition">
                  <FaImage className="text-red-500" />
                  <span className="text-gray-300 text-sm">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="New Username"
                value={editData.username}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 outline-none"
              />

              <input
                type="email"
                placeholder="New Email"
                value={editData.email}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 outline-none"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full mt-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ===== Change Password Popup ===== */}
      {showPasswordEdit && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-10">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-80 relative shadow-lg animate-fadeIn">
            <button
              onClick={() => setShowPasswordEdit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-semibold text-red-400 mb-4 text-center">
              Change Password
            </h2>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 outline-none"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 outline-none"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 outline-none"
              />
            </div>

            <button
              onClick={() => setShowPasswordEdit(false)}
              className="w-full mt-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <FaSave /> Update Password
            </button>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default UserProfile;
