const express = require("express");
const { handleRoadmap } = require("../controllers/roadmap.controller");

const router = express.Router();

/* POST /api/roadmap */
router.post("/", handleRoadmap);

module.exports = router;
