import { useState } from "react";
import { assets } from "../../../../FRONTEND/src/assets/admin_assets/assets";
import "./AddFood.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function AddFood() {
  const [image, setImage] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      image: image,
    };
    const res = await axios.post(
      "http://localhost:8080/api/food/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setTimeout(() => {
        reset(); // reseting the data
        setImage(false); //reseting the image
      }, 5400);
      // Reset the form fields

      // console.log("valid data");
      // console.log(res.data.message);
      // console.log(res.data);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <div className="ps-[7%] w-[50%] full_width mt-[1rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="full_styling"
        >
          <div>
            <label htmlFor="image" className="">
              <h2 className="">Upload Image</h2>

              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
                className=" w-[10rem] cursor-pointer "
                style={{ display: "block" }}
              />
            </label>

            <input
              type="file"
              id="image"
              name="image"
              required
              {...register("image", { required: true })}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <br />
            {errors.image && (
              <span className="text-[tomato]">This field is required</span>
            )}
          </div>
          <div className="product_name">
            <label htmlFor="product-name" className="">
              Product Name
            </label>
            <br></br>
            <input
              type="text"
              name="name"
              id="product-name"
              className="w-full"
              placeholder="Type here"
              {...register("name", { required: true })}
            />
            <br />
            {errors.name && (
              <span className="text-[#FF0000] ">This field is required</span>
            )}
          </div>

          <div className="product_description mt-4">
            <label htmlFor="product-description" className="">
              Product description
            </label>
            <br></br>
            <textarea
              type="text"
              name="description"
              id="product-description"
              cols={50}
              rows={4}
              placeholder="write comment here"
              {...register("description", { required: true })}
            ></textarea>

            {errors.description && (
              <span className="text-[#FF0000] ">This field is required</span>
            )}
          </div>
          <div className="mt-4 select_tag flex gap-5  w-full">
            <div className="">
              <label htmlFor="category" className="text-[1rem] ">
                Product category
              </label>
              <br></br>
              <select
                className="w-[100%]"
                name="category"
                id="category"
                defaultValue="Salad"
                {...register("category", { required: true })}
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
              {errors.category && (
                <span className="text-[#FF0000] ">This field is required</span>
              )}
            </div>
            <div className="">
              {" "}
              <label htmlFor="price" className="text-[1rem] ">
                Product Price
              </label>
              <br />
              <input
                name="price"
                type="number"
                placeholder="$20"
                className="w-[9rem] price_input"
                {...register("price", { required: true })}
              />
              <br />
              {errors.price && (
                <span className="text-[#FF0000] ">This field is required</span>
              )}
            </div>
          </div>
          <button type="submit" className="mt-4 btn btn-active btn-neutral">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}
export default AddFood;
