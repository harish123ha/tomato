import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../CONTEXT/StoreContext";
import { toast } from "react-toastify";

function Navbar({ showLogin, setShowLogin }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Home");
  const { getCartTotal, token, setToken } = useContext(StoreContext);
  // logout
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("You Logged Out");
    setToken("");

    navigate("/");
    setTimeout(function () {
      window.location.href = window.location.href;
    }, 4000);
  };

  return (
    <>
      <nav className="py-3 flex justify-between items-center px-6">
        <div className="sm:w-[8rem] w-[5rem]">
          <Link to="/">
            <img src={assets.logo} alt="" />
          </Link>
        </div>
        <div className="hide flex gap-2 sm:gap-3 font-medium text-[#49557e] text-[0.6rem] sm:text-[1rem]">
          <div
            onClick={() => setMenu("Home")}
            className={`cursor-pointer ${menu === "Home" ? "active" : ""}`}
          >
            <a href="/"> Home</a>
          </div>
          <div
            onClick={() => setMenu("Menu")}
            className={`cursor-pointer ${menu === "Menu" ? "active" : ""}`}
          >
            <a href="#menu">Menu</a>
          </div>
          <div
            onClick={() => setMenu("mobile-app")}
            className={`cursor-pointer ${
              menu === "mobile-app" ? "active" : ""
            }`}
          >
            <a href="#mobile-app"> mobile-app</a>
          </div>
          <div
            onClick={() => setMenu("Contact-us")}
            className={`cursor-pointer ${
              menu === "Contact-us" ? "active" : ""
            }`}
          >
            <a href="#footer">Contact-us</a>
          </div>
        </div>
        <div className="basket flex gap-2 sm:gap-5 items-center ">
          <Link to={"/order"}>
            <img
              src={assets.bag_icon}
              alt=""
              className="w-[1rem] sm:w-[1.8rem]"
            />
            {getCartTotal() > 0 ? <p className="dot2"></p> : ""}
          </Link>
          <Link to="/cart">
            {" "}
            <img
              src={assets.basket_icon}
              alt=""
              className="w-[1rem] sm:w-[1.8rem]"
            />
            {getCartTotal() > 0 ? <p className="dot"></p> : ""}
          </Link>
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className=" px-3 py-[2px] sm:px-7 sm:py-2 border rounded-3xl text-[#49557e] border-[tomato] hover:bg-[#fff4f2] transition duration-300 active:scale-90"
            >
              Sign in
            </button>
          ) : (
            <button onClick={logout} className="btn btn-outline btn-error">
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
