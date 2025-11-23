import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);
    const [skillGap, setSkillGap] = useState(null);
    const [roadmap, setRoadmap] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedAnalysis = sessionStorage.getItem("careerAnalysis");
        if (!storedAnalysis) {
            navigate("/");
            return;
        }

        const parsedAnalysis = JSON.parse(storedAnalysis);
        setAnalysis(parsedAnalysis);
        fetchResults(parsedAnalysis);
    }, [navigate]);

    const fetchResults = async (analysisData) => {
        try {
            setLoading(true);
            setError("");

            // Fetch skill gap
            const skillGapResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/skill-gap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetRole: analysisData.targetRole,
                    currentSkills: analysisData.currentSkills,
                }),
            });

            if (!skillGapResponse.ok) {
                throw new Error("Failed to fetch skill gap analysis");
            }
            const skillGapData = await skillGapResponse.json();
            setSkillGap(skillGapData);

            // Fetch roadmap
            const roadmapResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roadmap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetRole: analysisData.targetRole }),
            });

            if (!roadmapResponse.ok) {
                throw new Error("Failed to fetch roadmap");
            }
            const roadmapData = await roadmapResponse.json();
            setRoadmap(roadmapData);

            // Fetch HackerNews
            const newsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackernews`);
            if (newsResponse.ok) {
                const newsData = await newsResponse.json();
                setNews(newsData.stories);
            }
        } catch (err) {
            console.error("Error fetching results:", err);
            setError("Failed to load results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNewAnalysis = () => {
        sessionStorage.removeItem("careerAnalysis");
        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Loading your career analysis...</p>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return null;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Your Career Analysis
                        </h1>
                        <Button
                            onClick={handleNewAnalysis}
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                            New Analysis
                        </Button>
                    </div>
                    <p className="text-lg text-gray-600">
                        Target Role: <span className="font-semibold text-blue-600">{analysis.targetRole}</span>
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Left: Skill Gap Results */}
                    <div className="space-y-6">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg p-7">
                                <CardTitle>Skills Assessment</CardTitle>
                                <CardDescription className="text-green-100">
                                    Your matched and missing skills
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {skillGap && (
                                    <div className="space-y-6">
                                        {/* Matched Skills */}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                                Matched Skills ({skillGap.matchedSkills.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skillGap.matchedSkills.length > 0 ? (
                                                    skillGap.matchedSkills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No matched skills yet</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Missing Skills */}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                                <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                                                Skills to Learn ({skillGap.missingSkills.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skillGap.missingSkills.length > 0 ? (
                                                    skillGap.missingSkills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-sm">All skills matched!</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Suggestions */}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                                            <ul className="space-y-2">
                                                {skillGap.recommendations.map((rec, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                                                        <span className="text-gray-700">{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Learning Order */}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Suggested Learning Order</h3>
                                            <ol className="space-y-2">
                                                {skillGap.suggestedLearningOrder.map((skill, idx) => (
                                                    <li key={idx} className="flex items-center">
                                                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-semibold rounded-full mr-3">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-gray-700">{skill}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Roadmap */}
                    <div className="space-y-6">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg p-7">
                                <CardTitle>Learning Roadmap</CardTitle>
                                <CardDescription className="text-purple-100">
                                    Your 3-phase career development plan
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {roadmap && (
                                    <div className="space-y-4">
                                        {roadmap.phases.map((phase) => (
                                            <div
                                                key={phase.phase}
                                                className="border-l-4 border-purple-500 pl-4 py-3"
                                            >
                                                <h4 className="font-semibold text-gray-900">
                                                    Phase {phase.phase}: {phase.duration}
                                                </h4>
                                                <ul className="mt-2 space-y-1">
                                                    {phase.topics.map((topic, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-sm text-gray-700 flex items-center"
                                                        >
                                                            <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                                            {topic}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom: Tech News */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg p-7">
                        <CardTitle>Latest Tech News</CardTitle>
                        <CardDescription className="text-indigo-100">
                            Top stories from Hacker News
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {news.length > 0 ? (
                            <div className="space-y-4">
                                {news.map((story) => (
                                    <div
                                        key={story.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <a
                                                    href={story.url || "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-gray-900 hover:text-blue-600 wrap-break-word"
                                                >
                                                    {story.title}
                                                </a>
                                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                                                    <span>👤 {story.by}</span>
                                                    <span>⭐ {story.score} points</span>
                                                    <span>📝 {story.type}</span>
                                                    <span>⏱️ {new Date(story.time * 1000).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                Unable to load tech news at the moment
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
