const express = require("express");
const router = express.Router();

// Import controller
const { getChatResponse, getChatHealth } = require("../controllers/ChatBot");

// Chat routes
router.post("/message", getChatResponse);
router.get("/health", getChatHealth);

module.exports = router;
