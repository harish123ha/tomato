import "./Banner.css";

function Banner() {
  return (
    <>
      <div className="banner">
        <div className="banner-text">
          <h1 className="font-[500] text-white ">
            Order your favourite food here
          </h1>
          <p className="hide_para">
            Choose from diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission to satisfy your cravings and elevate you dining experience,
            one delicious meal at a time
          </p>
          <button className=" px-3 py-[2px] sm:px-7 sm:py-2 border rounded-3xl text-[#49557e] border-[tomato] bg-[#fff4f2] hover:text-[tomato] transition duration-300 active:scale-90">
            View menu
          </button>
        </div>
      </div>
    </>
  );
}
export default Banner;
