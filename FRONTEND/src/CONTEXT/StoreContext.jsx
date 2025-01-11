import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const url = "https://food-del-backend-0pjs.onrender.com";
  const [cartItem, setCartItem] = useState({});

  //handle addtoCart and removefromcart with delay important loading cart with some dalay
  let timeoutId = null;
  const handleClick = (callback) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
    }, 500);
  };

  // FETCHING ALL FOOD FROM BACKEND CODE START HERE
  const [food_list, setFood_list] = useState([]);
  const fetchFood = async () => {
    const response = await axios.get(`${url}/api/food`);
    if (response.data.success) {
      setFood_list(response.data.data);
    } else {
      console.log("somethi wetn wr asdf");
    }
  };

  // add to cartt in frontend

  const addToCart = async (itemId) => {
    if (token) {
      handleClick(async () => {
        //handle add to cart with delay start
        try {
          if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
          } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
          }
        } catch (error) {
          console.log(error);
        }

        try {
          // for add to cart in backend database dynamic
          if (token) {
            console.log("token available in context api");
            await axios.post(
              url + "/api/cart/add",
              { itemId },
              {
                headers: {
                  authorization: token,
                },
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      toast.success("Please Login First");
    }

    //handle add to cart with delay close
  };

  // remove from cart for frontend

  const removeFromCart = async (itemId) => {
    handleClick(async () => {
      //handle add to cart with delay start
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      // for remove from cart in backend database dynamic

      if (token) {
        console.log("token available in context api");
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          {
            headers: {
              authorization: token,
            },
          }
        );
      }
    }); //handle add to cart with delay close
  };

  // load cart data when we refresh the page the quantity should be the same sa our database

  const loadCartData = async (token) => {
    console.log("token available in context ap load Datai");
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: { authorization: token },
        }
      );
      // console.log("Request:", response.config);
      // console.log("Response:", response.data);

      // console.log(response.data);
      setCartItem(response.data.cartData);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        console.log("Token is not valid or is not provided");
        // You can also remove the token from local storage here
        localStorage.removeItem("token");
      }
    }
  };

  // FETCHING ALL FOOD FROM BACKEND CODE CLOSE HERE

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
        // console.log(totalAmount);
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFood();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    setCartItem,
    getCartTotal,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
