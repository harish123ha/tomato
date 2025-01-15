import "./Orders.css";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { assets } from "../../../../FRONTEND/src/assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../CONTEXT/StoreContext";

function Orders() {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url + "/api/order/allorder");
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);
  // console.log(orders);

  return (
    <>
      <div className="h-[100vh] p-4">
        <div>
          {loading ? (
            <div className="verify">
              <p className="spinner"></p>
            </div>
          ) : (
            <div>
              <div className="dasdf">
                <h1 className="font-bold text-3xl mb-3">My Orders</h1>
                {orders.map((order, index) => {
                  return (
                    <div
                      key={index}
                      className="mb-5 items-center order border-slate-500 border-2 rounded-md py-4"
                    >
                      <div className="ps-4">
                        <img src={assets.parcel_icon} alt="" />
                      </div>
                      <p>
                        {order.items.map((item, index) => {
                          if (index === order.items.length - 1) {
                            return item.name + "x" + item.quantity;
                          } else {
                            return item.name + "x" + item.quantity + " , ";
                          }
                        })}
                      </p>
                      <div>${order.amount}.00</div>
                      <div>items:{order.items.length}</div>

                      <div className="text-center">
                        <span className="text-[tomato] text-lg">&#8226; </span>
                        <span>Food Processing</span>
                      </div>

                      <div className="">
                        <Link
                          to={`/address/${order._id}`}
                          className="active:scale-95 bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        >
                          ADDRESS
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Orders;
