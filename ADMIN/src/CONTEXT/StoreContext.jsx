import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://tomato-backend-1ga1.onrender.com";

  const contextValue = {
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
