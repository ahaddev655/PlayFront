import React from "react";
import Sidebar from "../components/main/admin/Sidebar";
import Admin_Header from "../components/main/admin/Admin_Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full lg:w-[80%]">
        <Admin_Header />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
