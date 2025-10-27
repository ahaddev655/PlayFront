import React from "react";
import User_Header from "./../components/main/User_Header";
import User_Footer from "./../components/main/User_Footer";
import { Outlet } from "react-router-dom";

function CategoryLayout() {
  return (
    <div>
      <User_Header />
      <Outlet />
      <User_Footer />
    </div>
  );
}

export default CategoryLayout;
