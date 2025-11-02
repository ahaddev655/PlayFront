import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GamesSuggestion_Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gameTitle: "",
    suggestion: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.gameTitle ||
      !formData.suggestion
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for your suggestion!");

    setFormData({
      name: "",
      email: "",
      gameTitle: "",
      suggestion: "",
    });
  };

  return (
    <div className="mt-12 bg-gray-900 border-2 border-red-600 rounded-xl p-6 text-white max-w-2xl mx-auto shadow-lg my-12">
      <h1 className="text-2xl font-semibold mb-4 text-red-500">
        Game Suggestion Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Game Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Game Title</label>
          <input
            type="text"
            name="gameTitle"
            placeholder="e.g., Elden Ring"
            value={formData.gameTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Suggestion */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Your Suggestion
          </label>
          <textarea
            name="suggestion"
            placeholder="Write why this game should be added..."
            rows="4"
            value={formData.suggestion}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition"
        >
          Submit Suggestion
        </button>
      </form>
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

export default GamesSuggestion_Component;
