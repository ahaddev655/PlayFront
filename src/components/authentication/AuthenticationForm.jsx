import axios from "axios";
import React, { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthenticationForm() {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    profileImage: null,
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  // File Input Handler
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clean previous object URL
      if (formData.profileImage) {
        URL.revokeObjectURL(formData.profileImage);
      }

      const profileImageURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: profileImageURL,
        file, // Keep the original file for backend upload if needed
      }));
    }
  };

  // Input Value Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ----- Validations -----
    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.fullName
    ) {
      toast.error("All Fields Are Required");
      return;
    }

    if (formData.username.includes(" ")) {
      toast.error("Invalid username — remove spaces.");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Invalid Email Address");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }

    try {
      // Prepare data for backend (you can send file if API supports it)
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("username", formData.username);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      if (formData.file) {
        payload.append("profileImage", formData.file);
      }

      const res = await axios.post(
        "https://play-front-backend.vercel.app/api/auth/signup",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res?.data?.message || "Registration Successful!");
      console.log("Sign-Up Response:", res.data);

      // Cleanup and reset form
      if (formData.profileImage) {
        URL.revokeObjectURL(formData.profileImage);
      }

      setFormData({
        profileImage: null,
        fullName: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Sign-Up API Error:", err);
      toast.error(
        err?.response?.data?.error || "Sign-up failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-white">
      <div className="mt-5 space-y-4">
        {/* Profile Image Upload */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 p-0.5 border-2 border-red-600 rounded-full overflow-hidden">
            <div
              className="w-full h-full rounded-full grid place-items-center cursor-pointer hover:bg-gray-600 bg-gray-700 bg-cover bg-center transition-colors"
              onClick={handleClick}
              style={
                formData.profileImage
                  ? {
                      backgroundImage: `url(${formData.profileImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {!formData.profileImage && (
                <IoCameraOutline className="text-3xl text-gray-300" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Full Name Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter Your Full Name"
            className="bg-gray-800 py-3 px-3 rounded-md border border-gray-700 mt-2 focus:border-red-600 transition-colors"
            onChange={handleInputChange}
            value={formData.fullName}
          />
        </div>

        {/* Username Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Your Username"
            className="bg-gray-800 py-3 px-3 rounded-md border border-gray-700 mt-2 focus:border-red-600 transition-colors"
            onChange={handleInputChange}
            value={formData.username}
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="bg-gray-800 py-3 px-3 rounded-md border border-gray-700 mt-2 focus:border-red-600 transition-colors"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="bg-gray-800 py-3 px-3 rounded-md border border-gray-700 mt-2 focus:border-red-600 transition-colors w-full"
              onChange={handleInputChange}
              value={formData.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <LuEyeClosed className="absolute top-[25px] right-3.5 text-xl cursor-pointer" />
              ) : (
                <LuEye className="absolute top-[25px] right-3.5 text-xl cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full text-center py-3 bg-red-900 hover:bg-red-800 rounded-lg transition-colors"
          >
            Create Your Account
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-2">
          <span className="w-[25%] border-t border-white/50"></span>
          <span className="px-3 text-white text-sm">Or Continue with</span>
          <span className="w-[25%] border-t border-white/50"></span>
        </div>

        {/* Google Login */}
        <div className="py-3 px-1 text-center bg-white transition-colors hover:bg-white/95 text-black rounded-sm cursor-pointer">
          <div className="flex items-center justify-center gap-3 text-lg text-red-500 font-medium">
            <FaGoogle className="w-5 h-5" /> Continue With Google
          </div>
        </div>
      </div>
    </form>
  );
}

export default AuthenticationForm;
