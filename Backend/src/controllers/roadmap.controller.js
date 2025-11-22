const { getRoadmap } = require("../services/roadmap.service");

function handleRoadmap(req, res) {
    try {
        const { targetRole } = req.body;
        const result = getRoadmap(targetRole);

        if (result.status !== 200) {
            return res.status(result.status).json({ error: result.error });
        }

        return res.json(result.roadmap);
    } catch (error) {
        console.error("Error in roadmap generator:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleRoadmap,
};
