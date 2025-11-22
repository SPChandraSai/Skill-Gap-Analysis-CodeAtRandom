const express = require("express");
const { handleSkillGap } = require("../controllers/skillGap.controller");

const router = express.Router();

/* POST /api/skill-gap */
router.post("/", handleSkillGap);

module.exports = router;
