import { useEffect } from "react";
import "./Orders.css";
import axios from "axios";

function Orders() {
  const getAllOrders = async () => {
    try {
      const res = await axios.get("https://food-del-backend-0pjs.onrender.com/api/order/allOrders");
      if (res.data.success) {
        console.log(res.data.data);
      } else {
        console.log("error");
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div className="pl-[20%]  mt-[5rem]">Ordersxczxvzxcv</div>;
    </>
  );
}
export default Orders;
