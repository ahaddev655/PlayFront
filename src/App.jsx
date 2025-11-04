import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Authentication_Page from "./pages/authentication/Authentication_Page";
import WishList_Page from "./pages/main/WishList_Page";
import UpcomingGames_Page from "./pages/main/UpcomingGames_Page";
import Deals_Page from "./pages/main/Deals_Page";
import CategoryLayout from "./layouts/CategoryLayout";
import Categories_Component from "./components/main/Categories_Component";
import Home_Page from "./pages/main/Home_Page";
import UserProfile from "./pages/main/profile/UserProfile";

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
        {
          path: "wishlist",
          element: <WishList_Page />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Authentication_Page />,
    },
    {
      path: "/user-profile",
      element: <UserProfile />,
    },
    {
      path: "/category/",
      element: <CategoryLayout />,
      children: [
        {
          path: "rpg",
          element: <Categories_Component />,
        },
        {
          path: "action",
          element: <Categories_Component />,
        },
        {
          path: "fighting",
          element: <Categories_Component />,
        },
        {
          path: "adventure",
          element: <Categories_Component />,
        },
        {
          path: "simulation",
          element: <Categories_Component />,
        },
        {
          path: "survival",
          element: <Categories_Component />,
        },
        {
          path: "puzzle",
          element: <Categories_Component />,
        },
        {
          path: "racing",
          element: <Categories_Component />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
