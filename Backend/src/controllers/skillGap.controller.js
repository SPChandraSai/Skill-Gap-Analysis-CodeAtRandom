const { analyzeSkillGap } = require("../services/skillGap.service");

async function handleSkillGap(req, res) {
    try {
        const { targetRole, currentSkills } = req.body;

        if (!targetRole || !Array.isArray(currentSkills)) {
            return res.status(400).json({
                error: "Invalid request. targetRole and currentSkills are required.",
            });
        }

        const result = analyzeSkillGap(targetRole, currentSkills);

        if (result.error) {
            return res.status(404).json({ error: result.error });
        }

        return res.json(result);
    } catch (error) {
        console.error("Error in skill gap analyzer:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleSkillGap,
};
