const express = require("express");
const {
  listingData,
  createListing,
  destroyListing,
  formlistingData,
} = require("../controllers/listingController");

// const { storage } = require("../coludconfig.js");

const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", listingData);
router.get("/new", formlistingData);

router.post("/add", upload.single("image"), createListing);
router.delete("/:id", destroyListing);

module.exports = router;
