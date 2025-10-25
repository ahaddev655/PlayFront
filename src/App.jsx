import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_Page from "./pages/Home_Page";
import MainLayout from "./layouts/MainLayout";
import Authentication_Page from "./pages/Authentication_Page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home_Page />,
        },
        {
          path: "deals",
          element: "Deals_Page",
        },
        {
          path: "upcoming-games",
          element: "Upcoming_Page",
        },
      ],
    },
    {
      path: "/auth",
      element: <Authentication_Page />,
    },
    {
      path: "/wishlist",
      element: "WishList_Page",
    },
    {
      path: "/profile",
      element: "Profile_Page",
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
