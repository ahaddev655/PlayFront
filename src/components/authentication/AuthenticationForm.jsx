import React, { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthenticationForm() {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  // File Input Handler
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clean previous object URL
      if (formData.image) {
        URL.revokeObjectURL(formData.image);
      }

      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageURL,
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // ----- Validations -----
    if (!formData.email || !formData.username || !formData.password) {
      toast.error("All Fields Are required");
      return;
    }
    if (formData.username.includes(" ")) {
      toast.error("Invalid username, remove gaps.");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Invalid Email");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }

    // ----- Simulate Registration Success -----
    toast.success("You are registered successfully!");
    console.log("Form Data:", formData);

    // Revoke object URL before reset
    if (formData.image) {
      URL.revokeObjectURL(formData.image);
    }

    // Reset Form
    setFormData({
      image: null,
      username: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5 space-y-2">
        {/* Image Upload */}
        <div>
          <div className="relative w-25 h-25 mx-auto p-0.5 border-2 border-red-600 rounded-full">
            <div
              className={`w-full h-full rounded-full grid place-items-center cursor-pointer hover:bg-gray-600 bg-gray-700 bg-cover bg-center transition-colors`}
              onClick={handleClick}
              style={
                formData.image
                  ? { backgroundImage: `url(${formData.image})` }
                  : {}
              }
            >
              {!formData.image && (
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

        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Full Name"
            className="bg-gray-800 py-3 px-3 rounded-md border border-gray-700 mt-2 focus:border-red-600 transition-colors"
            onChange={handleInputChange}
            value={formData.name}
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
            type="text"
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

        <div className="flex items-center justify-center my-2">
          <span className="w-[25%] border-t border-white/50"></span>
          <span className="px-3 text-white text-sm">Or Continue with</span>
          <span className="w-[25%] border-t border-white/50"></span>
        </div>

        {/* Google */}
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
