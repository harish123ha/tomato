import { assets } from "../../assets/frontend_assets/assets";
import "./Footer.css";
function Footer() {
  return (
    <>
      <div className="bg-[#323232] text-[#d9d9d9] py-5 px-10 mt-8" id="footer">
        {/* // left footer */}
        <div className="pt-6 flex justify-between full_footer">
          <div className="flex flex-col gap-3 w-[40vw]">
            <div className=" text_increase">
              <img
                src={assets.logo}
                alt=""
                className="text-[tomato] w-[16vw]"
              />
            </div>
            <p className="text-[8px] sm:text-[8px] mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              tempore ratione harum! Optio quasi iste asperiores vitae tempore
              quisquam. Tenetur sit fugiat ratione ipsa dignissimos quo eum
              doloremque obcaecati.
            </p>
            <div className="flex gap-2 w-[2vw]">
              <img
                src={assets.facebook_icon}
                alt=""
                className="text-white font-bold "
              />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>
          {/* middle footer */}
          <div className="text_increase">
            <h1 className="font-semibold text-white">COMPANY</h1>
            <div className="mt-2">
              <p>Home</p>
              <p>About us</p>
              <p>Delivery</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          {/* right footer */}

          <div className="text_increase">
            <h1 className="font-semibold text-white">GET IN TOUCH</h1>
            <div className="mt-2">
              <p>+91-7217307276</p>
              <p>harishupadhyay999912@gmail.com</p>
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <h3 className="text-center mt-6 text-white text-[2vw]">
          Copyright 2024© Tomato.com-All Right Reserved
        </h3>
      </div>
    </>
  );
}
export default Footer;
