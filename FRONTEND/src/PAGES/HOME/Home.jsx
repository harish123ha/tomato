import { useState } from "react";
import Banner from "../../COMPONENTS/BANNER/Banner";
import ExploreMenu from "../../COMPONENTS/EXPLOREMENU/ExploreMenu";
import FoodDisplay from "../../COMPONENTS/FOODDISPLAY/FoodDisplay";
import MobileApp from "../../COMPONENTS/MOBILEAPP/MobileApp";
import Footer from "../../COMPONENTS/FOOTER/Footer";

function Home() {
  const [explore, setExplore] = useState("All");

  return (
    <>
      <Banner />
      <ExploreMenu explore={explore} setExplore={setExplore} />
      <FoodDisplay explore={explore} />
      <MobileApp />
    </>
  );
}
export default Home;
