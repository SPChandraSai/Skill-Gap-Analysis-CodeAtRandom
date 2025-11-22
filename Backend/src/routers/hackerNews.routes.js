const express = require("express");
const { handleHackerNews } = require("../controllers/hackerNews.controller");

const router = express.Router();

/* GET /api/hackernews */
router.get("/", handleHackerNews);

module.exports = router;
