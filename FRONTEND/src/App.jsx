import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./COMPONENTS/NAVBAR/Navbar";
import Home from "./PAGES/HOME/Home";
import { useContext, useState } from "react";
import Login from "./COMPONENTS/LOGIN/Login";
import Cart from "./PAGES/CART/Cart";
import PlaceOrder from "./PAGES/PLACEORDER/PlaceOrder";
import Footer from "./COMPONENTS/FOOTER/Footer";
import { ToastContainer, toast } from "react-toastify";
import { StoreContext } from "./CONTEXT/StoreContext";
import Uorder from "./PAGES/UORDER/Uorder";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  // console.log(showLogin);
  console.log(import.meta.env.VITE_SOME_KEY);

  return (
    <>
      <div className="app  flex-1">
        {showLogin ? (
          <Login showLogin={showLogin} setShowLogin={setShowLogin} />
        ) : (
          <></>
        )}
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/placeorder" element={<PlaceOrder />}></Route>
          <Route path="/order" element={<Uorder />}></Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
