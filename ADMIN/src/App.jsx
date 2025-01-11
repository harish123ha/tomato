import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./COMPONENTS/NAVBAR/Navbar";
import Sidebar from "./COMPONENTS/SIDEBAR/Sidebar";
import List from "./PAGES/FOODLISTS/List";
import Add from "./PAGES/ADD/Add";
import Order from "./PAGES/ORDERS/Order";
import { ToastContainer, toast } from "react-toastify";
import Harish from "./COMPONENTS/Harish";

function App() {
  return (
    <>
      <div className="w-full fixed top-0">
        <Navbar />
        <div className="w-[20%] border-e-[3px] border-[#e2e2e2] h-[100vh] fixed  mt-[4.7rem]">
          <Sidebar />
        </div>
      </div>
      <Routes>
        <Route path="/list" element={<List />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/" element={<Harish />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
