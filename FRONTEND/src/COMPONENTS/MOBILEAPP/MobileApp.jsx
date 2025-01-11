import { assets } from "../../assets/frontend_assets/assets";
import "./MobileApp.css";

function MobileApp() {
  return (
    <>
      <div
        className="flex justify-center items-center flex-col"
        id="mobile-app"
      >
        <div className="text-[4vw] font-semibold">
          <h1>For Better Experience Download</h1>
          <h1 className="text-center">Tomato App</h1>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4 w-[35vw]">
          <div>
            <img src={assets.play_store} alt="" />
          </div>
          <div>
            <img src={assets.app_store} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
export default MobileApp;
