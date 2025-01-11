import { useState } from "react";
import { menu_list } from "../../assets/frontend_assets/assets";
import "./ExploreMenu.css";

function ExploreMenu({ explore, setExplore }) {
  return (
    <>
      <div id="menu">
        <div>
          <h1 className="ms-5  text-xl sm:text-4xl text-[#262626] font-bold">
            Explore our Menu
          </h1>
          <p className="ms-5 explore_menu_text">
            Choose from a diverse menu featuring a delectable array dishes. Our
            mission is to satisfu your craving and elevate your dining
            experience ,one delicious meal at a time
          </p>
          <div className=" flex justify-center items-center gap-6 menu_content">
            {menu_list.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setExplore((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                className="flex flex-col justify-center items-center"
              >
                <img
                  src={item.menu_image}
                  alt=""
                  className={`w-[10.5vw] cursor-pointer ${
                    explore === item.menu_name ? "active_explore" : ""
                  }`}
                />
                <h1 className="text-[#747474] text-[1.5vw] cursor-pointer">
                  {item.menu_name}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
export default ExploreMenu;
