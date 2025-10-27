import React, { useState, useRef } from "react";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserProfile_Page() {
  const [userData, setUserData] = useState({
    name: "Prios1961",
    email: "JoseTPadilla@dayrep.com",
    image: null,
    created_at: "10:00 PM",
    created_on: "Monday",
  });

  const [showPopup, setShowPopup] = useState(false);
  const popupImageRef = useRef(null);

  // Handle field change in popup
  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change inside popup
  const handlePopupImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // Save edits
  const handleSave = () => {
    if (!userData.name || !userData.email.includes("@")) {
      toast.error("Please enter valid details!");
      return;
    }
    setUserData(userData);
    setShowPopup(false);
    toast.success("Profile updated successfully!");
  };

  // Get first letter of username
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white relative">
      {/* Main Profile Card */}
      <div className="w-[90%] sm:w-[500px] rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-red-600/50 p-6 text-center">
        <Link
          to="/"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-md w-[90px] h-10"
        >
          <FaArrowLeft /> Back
        </Link>
        {/* Profile Image / Initial */}
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full border-2 border-red-600 overflow-hidden mx-auto flex items-center justify-center bg-gray-800">
            {userData.image ? (
              <img
                src={userData.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl font-semibold text-red-500">
                {getInitial(userData.name)}
              </span>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
          <p className="text-gray-300">{userData.email}</p>

          <div className="mt-4 text-sm text-gray-400">
            <p>Joined on: {userData.created_on}</p>
            <p>At: {userData.created_at}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 border border-red-600/60 rounded-xl p-6 w-[90%] sm:w-[450px] shadow-lg relative">
            <h2 className="text-xl font-semibold text-red-500 mb-4">
              Edit Profile
            </h2>

            {/* Profile Image or Initial */}
            <div className="relative flex justify-center mb-4">
              <div
                className="w-28 h-28 border-2 border-red-600 rounded-full overflow-hidden cursor-pointer bg-gray-800 flex items-center justify-center select-none"
                onClick={() => popupImageRef.current.click()}
              >
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-semibold text-red-500">
                    {getInitial(userData.name)}
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={popupImageRef}
                onChange={handlePopupImageChange}
                className="hidden"
              />
            </div>

            {/* Name Field */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handlePopupChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handlePopupChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default UserProfile_Page;
