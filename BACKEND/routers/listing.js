const express = require("express");
const {
  listingData,
  createListing,
  destroyListing,
  formlistingData,
} = require("../controllers/listingController");

const router = express.Router();

router.get("/", listingData);
router.get("/new", formlistingData);

router.post("/add", upload.single("image"), createListing);
router.delete("/:id", destroyListing);

module.exports = router;
