import { useContext } from "react";

import "./FoodDisplay.css";
import FoodItem from "../FOODITEM/FoodItem";
import { StoreContext } from "../../CONTEXT/StoreContext";
function FoodDisplay({ explore }) {
  const { food_list, url } = useContext(StoreContext);
  console.log(food_list);
  return (
    <>
      <div>
        <div>
          <h2 className="text-[2vw] font-bold">Top Dishes Near For You</h2>
        </div>
        <div className="food_display_list p-4">
          {food_list.map((item, index) => {
            if (explore === "All" || explore === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
export default FoodDisplay;
