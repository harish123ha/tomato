import { NavLink } from "react-router-dom";
import { assets } from "../../../../FRONTEND/src/assets/admin_assets/assets";
import "./Sidebar.css";
function Sidebar() {
  return (
    <>
      <div className=" mt-14">
        <div className="flex flex-col gap-6 ps-[20%]">
          <NavLink
            to="/add"
            className="sidebar_items cursor-pointer hover:text-[] border-[#a9a9a9] border-y-2 border-s-2 rounded-s-sm flex items-center gap-2 p-2 "
          >
            <img src={assets.add_icon} alt="" className="w-[2.4rem]" />
            <p className="font-semibold text-[16px]">Add Items</p>
          </NavLink>
          <NavLink
            to="/list"
            className="sidebar_items cursor-pointer hover:text- border-[#a9a9a9] border-y-2 border-s-2 rounded-s-sm flex items-center gap-2 p-2 "
          >
            <img src={assets.order_icon} alt="" className="w-[2.4rem]" />
            <p className="font-semibold text-[16px]">List Items</p>
          </NavLink>
          <NavLink
            to="/orders"
            className="sidebar_items cursor-pointer hover:text- border-[#a9a9a9] border-y-2 border-s-2 rounded-s-sm flex items-center gap-2 p-2 "
          >
            <img src={assets.order_icon} alt="" className="w-[2.4rem]" />
            <p className="font-semibold text-[16px]">Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
