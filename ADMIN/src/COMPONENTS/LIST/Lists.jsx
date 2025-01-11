import { useEffect, useState } from "react";
import "./Lists.css";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
function Lists() {
  const url = "https://food-del-backend-0pjs.onrender.com";
  const [food_list, setFood_list] = useState([]);

  const foodData = async () => {
    const res = await axios.get(`${url}/api/food/`);
    // console.log(res);
    setFood_list(res.data.data);
    console.log(food_list);
  };

  const deleteData = async (userId) => {
    console.log(userId);
    const res = await axios.delete(`https://food-del-backend-0pjs.onrender.com/api/food/${userId}`);
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    foodData();
  };

  useEffect(() => {
    foodData();
    console.log(food_list);
  }, []);

  return (
    <>
      {food_list.length > 0 ? (
        <div className="p-[1.5rem]   mt-[6.7rem] lists">
          <div className="border-x-2 border-t-2">
            <div className="grid_container p-2 sm:ps-7 pb-3 font-semibold">
              <p>No.</p>
              <p>Images</p>
              <p>Name</p>
              <p>Category</p>
              <p>Price</p>
              <p>Action</p>
            </div>

            <hr className=" bg-[#333333]" />

            {food_list.map((item, index) => {
              return (
                <div key={index}>
                  <div className="grid_container p-2 sm:ps-7  py-2 items-center">
                    <p>{index}</p>
                    <img
                      src={`${url}/` + item.image}
                      alt=""
                      className="w-[4rem] h-[3.2rem] image_size"
                    />

                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p
                      onClick={() => deleteData(item._id)}
                      className="cursor-pointer  text-red-500 text-2xl delete"
                    >
                      <MdDelete />
                    </p>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" flex justify-center items-center h-[50vh]">
          <div className="font-bold text-4xl">
            No Food Item Available. Please add food first
          </div>
        </div>
      )}
    </>
  );
}
export default Lists;
