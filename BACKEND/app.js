require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const { data, connectToDB } = require("./config/db");
const Listing = require("./models/listing");
const cors = require("cors");
const Users = require("./models/user");
const tokenMiddleware = require("./middleware/tokenMiddleware");
const Orders = require("./controllers/orderController.js");

//

// inbuilt middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());

data();
connectToDB();

// REQUIRING AND USING THE ROUTES FORM THE ROUTER FOLDER
const listingRoute = require("./routers/listing");
const userRoute = require("./routers/user");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");

app.use("/api/food", listingRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.use(("/images", express.static("uploads")));

const saveData = async () => {
  const data = new Listing({
    name: "harish",
    image: "harsdfish",
    category: "harisdfsh",
    price: "12",
    description: "harish",
  });

  const data2 = await data.save();
  console.log(data2);
};

// saveData();

// app.get("/user", tokenMiddleware, (req, res) => {
//   console.log("working well");
// });
// // add to cart

// app.post("/add", tokenMiddleware, async (req, res) => {
//   const userId = req.userId;
//   console.log("Id===", userId);

//   const itemId = req.body.itemId;
//   console.log("product", itemId);
//   const user = await Users.findById(userId);
//   // res.send(user);
//   let cartData = user.cartData;
//   // res.send(cartData);
//   if (!cartData[req.body.itemId]) {
//     cartData[req.body.itemId] = 1;
//   } else {
//     cartData[req.body.itemId] += 1;
//   }
//   await Users.findByIdAndUpdate(userId, { cartData });
//   res.json({ success: true, message: "aded successfull", user });
// });

// // remove from cart

// app.post("/remove", tokenMiddleware, async (req, res) => {
//   const userId = req.userId;
//   console.log("Id===", userId);

//   const itemId = req.body.itemId;
//   console.log("product", itemId);
//   const user = await Users.findById(userId);
//   // res.send(user);
//   let cartData = user.cartData;
//   // res.send(cartData);
//   if (!cartData[req.body.itemId]) {
//     return res.json({ success: false, message: "Please add to cart first" });
//   } else {
//     cartData[req.body.itemId] -= 1;
//   }
//   await Users.findByIdAndUpdate(userId, { cartData });
//   res.json({ success: true, message: "aded successfull", user });
// });

// find// not working
app.get("/find", tokenMiddleware, async (req, res) => {
  const userId = req.userId;
  console.log("Id===", userId);

  // const itemId = req.body.itemId;
  // console.log("product", itemId);
  const user = await Users.findById(userId).populate("cartData");
  res.send(user);
});

app.listen(PORT, (req, res) => {
  console.log(`app is listening on port ${PORT}`);
});
