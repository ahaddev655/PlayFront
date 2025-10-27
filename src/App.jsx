import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_Page from "./pages/Home_Page";
import MainLayout from "./layouts/MainLayout";
import Authentication_Page from "./pages/Authentication_Page";
import UserProfile_Page from "./pages/UserProfile_Page";
import WishList_Page from "./pages/WishList_Page";
import UpcomingGames_Page from "./pages/UpcomingGames_Page";
import Deals_Page from "./pages/Deals_Page";

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
          element: <Deals_Page />,
        },
        {
          path: "upcoming-games",
          element: <UpcomingGames_Page />,
        },
      ],
    },
    {
      path: "wishlist",
      element: <WishList_Page />,
    },
    {
      path: "/auth",
      element: <Authentication_Page />,
    },
    {
      path: "/user-profile",
      element: <UserProfile_Page />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
