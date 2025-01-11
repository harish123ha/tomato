import "./Order.css";
import "../../COMPONENTS/CART/CartData.css";
import { useContext, useState } from "react";
import { StoreContext } from "../../CONTEXT/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Order() {
  const { getCartTotal, url, cartItem, food_list, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    placeOrder(data);
  };

  const placeOrder = async (data) => {
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    console.log(orderItems);
    let orderData = {
      address: {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
      },

      items: orderItems,
      amount: getCartTotal() + 2, // calculate the total amount
    };
    console.log(orderData);
    let res = await axios.post(url + "/api/order/place", orderData, {
      headers: {
        authorization: token,
      },
    });

    if (res.data.success) {
      console.log(res);
      toast.success(res.data.message);
      navigate("/");

      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      {getCartTotal() > 0 ? (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="place_order">
            {/* LEFT FORM SECTION */}
            <div className="  left_section">
              <h2 className="delivery_text mb-7 text-4xl font-bold">
                Delivery Information
              </h2>
              {/* FORM START HERER */}

              <div className="w-full flexf flex-col gap-4 ">
                <div className="w-full  lg:flex justify-between gap-2 items-center  ">
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    className="input input-bordered input-error w-full "
                    {...register("fname", { required: true })}
                  />
                  {errors.fname && <span></span>}
                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    className="input input-bordered input-error w-full "
                    {...register("lname", { required: true })}
                  />
                  {errors.lname && <span></span>}
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="input input-bordered input-error w-full mt-3"
                  {...register("email", { required: true })}
                />
                {errors.email && <span></span>}
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  className="input input-bordered input-error w-full mt-3"
                  {...register("street", { required: true })}
                />
                {errors.street && <span></span>}
                <div className="w-full lg:flex justify-between gap-2 items-center ">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="input input-bordered input-error w-full mt-3"
                    {...register("city", { required: true })}
                  />
                  {errors.city && <span></span>}
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="input input-bordered input-error w-full mt-3"
                    {...register("state", { required: true })}
                  />
                  {errors.state && <span></span>}
                </div>
                <div className="w-full  lg:flex justify-between gap-2 items-center ">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip-Code"
                    className="input input-bordered input-error w-full mt-3"
                    {...register("zipCode", { required: true })}
                  />
                  {errors.zipCode && <span></span>}
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="input input-bordered input-error w-full mt-3"
                    {...register("country", { required: true })}
                  />
                  {errors.country && <span></span>}
                </div>
                <input
                  name="phone"
                  minLength={10}
                  maxLength={10}
                  type="number"
                  placeholder="Phone"
                  className="input input-bordered input-error w-full mt-3"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <span></span>}
              </div>

              {/* <button className="mt-3 text-[1.5rem]  font-bold w-full btn btn-outline btn-success">
                SUBMIT
              </button> */}

              {/* FORM  CLOSE HERE */}
            </div>

            {/* RIGHT CART TOTAL SECTION */}

            {/* //CART TOTAL HERE */}
            <div className="">
              <div className="cart-total">
                <h2 className="delivery_text mb-4 text-4xl font-bold">
                  Cart Totals
                </h2>
                <div className="flex justify-between text-xl font-semibold text-[#555] gap-[50%]">
                  <h2>Subtotal</h2>
                  <p>${getCartTotal()}</p>
                </div>
                <hr className="my-3 h-[1px] bg-gray-600 border-none" />
                <div className="flex justify-between text-xl font-semibold text-[#555]">
                  <h2>Delivery Fee</h2>
                  <p>$2</p>
                </div>
                <hr className="my-3 h-[1px] bg-gray-600 border-none" />
                <div className="flex justify-between text-xl font-semibold text-[#555]">
                  <h2>Total</h2>
                  <p>${getCartTotal() + 2}</p>
                </div>

                <div className="flex gap-4 items-center mt-3">
                  <button
                    type="submit"
                    // onClick={placeOrder}
                    className=" text-white font-bold bg-[tomato] py-3 px-7 rounded-lg hover:opacity-90 active:scale-95 text-[10px] sm:text-[16px]"
                  >
                    PROCEED TO PAYMENT
                  </button>

                  <p
                    onClick={() => navigate("/cart")}
                    className="btn btn-error w-[10vw]"
                  >
                    BACK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="h-screen text-[5vw] text-center mt-10 font-bold">
          Please add some food in cart
        </div>
      )}
    </>
  );
}
export default Order;
