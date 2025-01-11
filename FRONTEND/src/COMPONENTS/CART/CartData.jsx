import { useContext } from "react";
import "./CartData.css";
import { StoreContext } from "../../CONTEXT/StoreContext";
import { Link, useNavigate } from "react-router-dom";
function CartData() {
  const { cartItem, removeFromCart, food_list, getCartTotal, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      {getCartTotal() > 0 ? (
        <div className="p-2 sm:p-10 mt-7 sm:mt-0">
          <div className="grid-container ">
            <div>Items</div>
            <div>Title</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div>Remove</div>
          </div>
          <hr className="my-1 h-[1px] bg-gray-600 border-none" />
          <div>
            {food_list.map((item, index) => {
              if (cartItem[item._id] > 0) {
                return (
                  <div>
                    <div className="grid-container  text-gray-600 ">
                      <img
                        src={`${url}/` + item.image}
                        alt=""
                        className="w-[3.5rem] cart_image"
                      />
                      <div className="cart_name">{item.name}</div>
                      <div className="cart_name">${item.price}</div>
                      <div className="cart_name">{cartItem[item._id]}</div>
                      <div className="cart_name">
                        ${item.price * cartItem[item._id]}
                      </div>
                      <div
                        onClick={() => removeFromCart(item._id)}
                        className="cursor-pointer"
                      >
                        x
                      </div>
                    </div>
                    <hr className="my-1 h-[1px] bg-gray-600 border-none" />
                  </div>
                );
              }
            })}
          </div>

          {/* // cart total start here */}
          <div className="flex justify-between mt-28 gap-[10vw] total_cart">
            <div className="cart-total">
              <h2 className="mb-4 text-4xl font-bold">Cart Totals</h2>
              <div className="flex justify-between text-xl font-semibold text-[#555] gap-[36vw]">
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
                  onClick={() => navigate("/placeOrder")}
                  className=" text-white font-bold bg-[tomato] py-3 px-7 rounded-lg hover:opacity-90 active:scale-95 text-[10px] sm:text-[16px]"
                >
                  PROCEED TO PAYMENT
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-error w-[15vw] text-white font-bold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
            {/* // promo code */}
            <div className="promo_full_div">
              <p className="text-[#555] text-xl mb-4">
                if you have a promo code .Enter it here
              </p>
              <div className="promo-code_div">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="promo code"
                  className="promo-code"
                />
                <button className="py-3 px-6 font-bold bg-black text-white rounded-[10px] hover:opacity-90 active:scale-95">
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen text-[5vw] text-center mt-10 font-bold">
          Please add some food in cart
        </div>
      )}
    </>
  );
}
export default CartData;
