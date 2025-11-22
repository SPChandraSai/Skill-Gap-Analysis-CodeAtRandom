const HACKERNEWS_TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const HACKERNEWS_ITEM_URL = "https://hacker-news.firebaseio.com/v0/item";

async function fetchTopTechStories(limit = 5) {
    // Fetch top story IDs
    const storiesResponse = await fetch(HACKERNEWS_TOP_STORIES_URL);
    if (!storiesResponse.ok) {
        throw new Error("Failed to fetch top stories");
    }

    const topStoryIds = await storiesResponse.json();

    // Take first 30 and then filter tech-type stories
    const topStories = topStoryIds.slice(0, 30);

    const storyPromises = topStories.map((id) =>
        fetch(`${HACKERNEWS_ITEM_URL}/${id}.json`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null)
    );

    const stories = await Promise.all(storyPromises);

    const validStories = stories
        .filter((story) => {
            return (
                story &&
                story.type === "story" &&
                story.title &&
                story.by &&
                story.score !== undefined
            );
        })
        .slice(0, limit);

    return validStories;
}

module.exports = {
    fetchTopTechStories,
};
