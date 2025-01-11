import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Login.css";
import { StoreContext } from "../../CONTEXT/StoreContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ showLogin, setShowLogin }) {
  const { url, token, setToken } = useContext(StoreContext);
  // console.log(url);
  const [currLogin, setCurrLogin] = useState("signup");
  // console.log(currLogin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    let newUrl = url;
    if (currLogin === "signup") {
      newUrl += "/api/user/register";
      // console.log(newUrl);
    } else {
      newUrl += "/api/user/login";
      // console.log(newUrl);
    }
    const response = await axios.post(`${newUrl}`, userData);
    if (response.data.success) {
      toast.success(response.data.message);

      setToken(response.data.token);
      console.log(response.data);
      // console.log(token);// token present hai lekin wo kabhi bhi console par print nahi hota hai
      localStorage.setItem("token", response.data.token);
      setTimeout(function () {
        window.location.href = window.location.href;
      }, 4000);

      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="login_popup w-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login_popup_container"
        >
          <div className="flex justify-between items-center">
            {currLogin === "signup" ? (
              <div className="font-bold text-2xl text-black">Sign Up</div>
            ) : (
              <div className="font-bold text-2xl text-black">Login</div>
            )}

            <img
              className="font-extrabold cursor-pointer"
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div>
            <div className="flex flex-col mt-7  justify-center  ms-2">
              {currLogin === "signup" ? (
                <>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered input-secondary w-full max-w-xs "
                    {...register("name", { required: true })}
                  />

                  {errors.name && (
                    <span className="text-red-500 ">
                      This field is required
                    </span>
                  )}
                </>
              ) : (
                <></>
              )}

              <>
                {" "}
                <input
                  name="email"
                  type="text"
                  placeholder="Your email"
                  className="input input-bordered input-secondary w-full max-w-xs mt-6"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </>

              <>
                {" "}
                <input
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  className="input input-bordered input-secondary w-full max-w-xs mt-6"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </>
            </div>

            <div className="flex justify-center items-center mt-4">
              {currLogin === "signup" ? (
                <button
                  type="submit"
                  className="w-[95%] py-3 px-3 bg-[tomato] text-[white] rounded-lg text-xl  hover:opacity-90 active:scale-95 font-semibold"
                >
                  Create account
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-[95%] py-3 px-3 bg-[tomato] text-[white] rounded-lg text-xl  hover:opacity-90 active:scale-95 font-semibold"
                >
                  Login
                </button>
              )}
            </div>
            <div className="ms-3 mt-5 text-[15px]">
              {currLogin === "signup" ? (
                <p className="font-bold">
                  Alreacy have an account?
                  <span
                    onClick={() => setCurrLogin("login")}
                    className="text-[tomato] font-extrabold cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="font-bold">
                  Create a new account?
                  <span
                    onClick={() => setCurrLogin("signup")}
                    className="text-[tomato] font-extrabold cursor-pointer"
                  >
                    Click here
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
