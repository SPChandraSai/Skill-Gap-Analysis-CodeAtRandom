const { fetchTopTechStories } = require("../services/hackerNews.service");

async function handleHackerNews(req, res) {
    try {
        const stories = await fetchTopTechStories(5);
        res.json({ stories });
    } catch (error) {
        console.error("Error fetching HackerNews:", error);
        res.status(500).json({
            error: "Failed to fetch HackerNews stories",
            stories: [],
        });
    }
}

module.exports = {
    handleHackerNews,
};
