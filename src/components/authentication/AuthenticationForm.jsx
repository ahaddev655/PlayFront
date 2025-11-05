import axios from "axios";
import React, { useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";

function AuthenticationForm() {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    profileImage: null,
    fullName: "",
    username: "",
    email: "",
    password: "",
    file: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  // 📸 File input click
  const handleClick = () => {
    inputRef.current.click();
  };

  // 📤 File upload
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (formData.profileImage) {
        URL.revokeObjectURL(formData.profileImage);
      }
      const profileImageURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: profileImageURL,
        file,
      }));
    }
  };

  // 🧾 Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧠 Manual Signup
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.fullName
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (formData.username.includes(" ")) {
      toast.error("Invalid username — remove spaces.");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Invalid Email Address.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("password", formData.password);
    if (formData.file) payload.append("profileImage", formData.file);

    axios
      .post("https://play-front-backend.vercel.app/api/auth/signup", payload)
      .then((res) => {
        toast.success(res?.data?.message || "Registration Successful!");
        if (formData.profileImage) URL.revokeObjectURL(formData.profileImage);
        setFormData({
          profileImage: null,
          fullName: "",
          username: "",
          email: "",
          password: "",
          file: null,
        });
      })
      .catch((err) => {
        console.error("Sign-Up API Error:", err);
        toast.error(
          err?.response?.data?.error || "Sign-up failed. Please try again."
        );
      });
  };

  // 🟢 Google Success
  const handleGoogleSuccess = (tokenResponse) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
      .then((response) => {
        const googleUser = {
          email: response.data.email,
          fullName: response.data.name,
          profileImage: response.data.picture,
        };

        setFormData((prev) => ({
          ...prev,
          fullName: googleUser.fullName || "",
          email: googleUser.email || "",
          username: googleUser.email.split("@")[0] || "",
          profileImage: googleUser.profileImage || null,
        }));

        toast.info("Google account info filled! You can complete signup.");

        // Send to backend for signup/login
        axios
          .post("http://localhost:3000/api/auth/google", googleUser)
          .then((res) => {
            if (res.data.success) {
              localStorage.setItem("token", res.data.token);
            } else {
              toast.error("Google authentication failed.");
            }
          })
          .catch((error) => {
            console.error("Google API Error:", error);
            toast.error("Backend Google authentication failed.");
          });
      })
      .catch((error) => {
        console.error("Google Auth failed:", error);
        toast.error("Google authentication failed.");
      });
  };

  // 🔴 Google Error
  const handleGoogleError = () => {
    toast.error("Google Sign-In was cancelled or failed.");
  };

  // 🟡 Custom Google Login hook
  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  return (
    <form onSubmit={handleSubmit} className="text-white">
      <div className="mt-5 space-y-4">
        {/* 🖼 Profile Image Upload */}
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

        {/* 🧍 Full Name */}
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

        {/* 🧑 Username */}
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

        {/* 📧 Email */}
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

        {/* 🔐 Password */}
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

        {/* 🧾 Submit */}
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

        {/* 🟡 Custom Google Button */}
        <div
          onClick={() => login()}
          className="py-3 px-1 text-center bg-white transition-colors hover:bg-white/95 text-black rounded-sm cursor-pointer"
        >
          <div className="flex items-center justify-center gap-3 text-lg text-red-500 font-medium">
            <FaGoogle className="w-5 h-5" /> Continue With Google
          </div>
        </div>
      </div>
    </form>
  );
}

export default AuthenticationForm;
