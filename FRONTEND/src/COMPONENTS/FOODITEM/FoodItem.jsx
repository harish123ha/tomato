import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../CONTEXT/StoreContext";

function FoodItem({ id, price, name, image, description }) {
  //   const [itemCount, setIntemCount] = useState(0);
  const { url } = useContext(StoreContext);
  const { addToCart, removeFromCart, cartItem } = useContext(StoreContext);

  return (
    <>
      <div className="food_item">
        <div className="image_container">
          <img src={`${url}/` + image} alt="" className="food_item_image" />
          {/* // counter plus icon start heree */}

          {!cartItem[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food_item_counters">
              <img
                src={assets.remove_icon_red}
                onClick={() => removeFromCart(id)}
                alt=""
              />
              <p>{cartItem[id]}</p>
              <img
                src={assets.add_icon_green}
                onClick={() => addToCart(id)}
                alt=""
              />
            </div>
          )}

          {/* // counter plus icon close heree */}
        </div>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <p className="text-[1.2rem] font-semibold">{name}</p>
            <img src={assets.rating_starts} alt="" className="w-[4.2rem]" />
          </div>
          <div>
            <p className="text-[#676767]">{description}</p>
            <p className="text-[tomato] text-xl py-3">${price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default FoodItem;
