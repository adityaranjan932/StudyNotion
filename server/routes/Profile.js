const express = require("express");
const router = express.Router();

// Define your routes
router.get("/test", (req, res) => {
  res.send("Profile route is working!");
});

// ✅ Export the router correctly
module.exports = router;
