import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationForm from "../../components/authentication/AuthenticationForm";

function Authentication_Page() {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-y-auto">
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
      <div className="min-w-[425px] bg-white/10 px-4 py-4 backdrop-blur-md rounded-lg">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-medium">Create Your Account</h1>
        </div>
        <AuthenticationForm />
      </div>
    </div>
  );
}

export default Authentication_Page;
