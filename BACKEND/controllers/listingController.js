const Listing = require("../models/listing");
const fs = require("fs");

// SHOWING ALL THE LISTING TO THE ADMIN

listingData = async (req, res) => {
  try {
    const listing = await Listing.find({});
    res.json({ success: true, message: "data get successful", data: listing });
  } catch (error) {
    res.json({ success: false, message: "ERROR" });
    console.log(error);
  }
};

formlistingData = async (req, res) => {
  console.log("working well");
  res.render("listing.ejs");
};

// CREATE LISTINGS

createListing = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "please send valid file." });
    } else {
      const file_name = `${req.file.path}`;

      const data = new Listing({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        image: file_name,
      });

      const saveData = await data.save();
      res.json({
        success: true,
        message: "listing created successful",
        data: saveData,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message, message2: "ERROR" });
  }
};

//   DESTROY LISTING

destroyListing = async (req, res) => {
  try {
    // const { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.json({ success: false, message: "listing does not exist" });
    } else {
      fs.unlink(listing.image, () => {});

      await Listing.findByIdAndDelete(id);
      res.json({ success: true, message: "Food Deleted Successful" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  listingData,
  createListing,
  destroyListing,
  formlistingData,
};
