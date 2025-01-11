const mongoose = require("mongoose");
const Atlas_url = process.env.ATLAS_URL;
//"mongodb://127.0.0.1:27017/ZOMATO";

async function connectToDB() {
  try {
    await mongoose.connect(Atlas_url);
    console.log("connected to db successfully");
  } catch (err) {
    console.error("error connecting to db:", err);
  }
}
connectToDB()
  .then((res) => {
    console.log("connected  to db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const data = () => {
  console.log("this is data");
};

module.exports = { data, connectToDB };
