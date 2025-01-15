import axios from "axios";
import { assets } from "../../../../FRONTEND/src/assets/frontend_assets/assets";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Address.css";

import { useContext } from "react";
import { StoreContext } from "../../CONTEXT/StoreContext";

function Address() {
  const { url } = useContext(StoreContext);
  const [address, setaddress] = useState({});
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams();

  // console.log("Id===", orderId);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url + `/api/order/address/${orderId}`);
      if (res.data.success) {
        setaddress(res.data.data);
        // console.log(res.data.data);
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
  // console.log(address.fname);
  return (
    <>
      <div className="p-10 padd ">
        <div className="address-grid ">
          <div>
            <h1 className="font-semibold">First Name</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.fname}
            </div>
          </div>
          <div>
            <h1 className="font-semibold">Last Name</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.lname}
            </div>
          </div>{" "}
          <div>
            <h1 className="font-semibold">Street</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.street}
            </div>
          </div>{" "}
          <div>
            <h1 className="font-semibold">City</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.city}
            </div>
          </div>{" "}
          <div>
            <h1 className="font-semibold">State</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.state}
            </div>
          </div>{" "}
          <div>
            <h1 className="font-semibold">Zip-Code</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.zipCode}
            </div>
          </div>{" "}
          <div>
            <h1 className="font-semibold">Country</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.country}
            </div>
          </div>
          <div>
            <h1 className="font-semibold">Phone</h1>
            <div className="bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.phone}
            </div>
          </div>{" "}
          <div className=" box">
            <h1 className="font-semibold">Email</h1>
            <div className="  bg-gray-300 py-2 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.email}
            </div>
          </div>
          <div className="mb-6 box">
            <h1 className="font-semibold">Full Address</h1>
            <div className="  bg-gray-300 py-6 px-4 border border-gray-300 rounded-r-md hover:bg-gray-300 shadow-md">
              {address.street} , {address.city} , {address.state}
              {address.Country} , {address.zipCode}
            </div>
          </div>
        </div>
        <Link
          to="/orders"
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
    </>
  );
}

export default Address;
