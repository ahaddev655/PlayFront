import React from "react";
import User_Header from "../../components/main/User_Header";
import MostDemandedGames_Component from "../../components/main/home/MostDemandedGames_Component";
import Categories_Component from "../../components/main/home/Categories_Component";
import UpComingGames_Component from "../../components/main/home/UpComingGames_Component";
import GamesSuggestion_Component from "../../components/main/home/GamesSuggestion_Component";
import LastestUploadedGames_Component from "../../components/main/home/LastestUploadedGames_Component";

function Home_Page() {
  return (
    <div className="section">
      <LastestUploadedGames_Component />
      <MostDemandedGames_Component />
      <Categories_Component />
      <UpComingGames_Component />
      <GamesSuggestion_Component />
    </div>
  );
}

export default Home_Page;
