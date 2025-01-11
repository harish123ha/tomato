import { assets } from "../../../../FRONTEND/src/assets/admin_assets/assets";

function Navbar() {
  return (
    <>
      <nav className="bg-white flex fixed top-0 z-10 border-b-[#9a9a9a] border-2 w-full justify-between items-center px-12 py-1">
        <div>
          <img src={assets.logo} alt="" className="w-[9rem]" />
        </div>
        <div>
          <img src={assets.profile_image} alt="" className="w-[2.6rem]" />
        </div>
      </nav>
      <hr />
    </>
  );
}
export default Navbar;
