import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
    const navigate = useNavigate();
    const [targetRole, setTargetRole] = useState("");
    const [currentSkillsInput, setCurrentSkillsInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const availableRoles = [
        "Frontend Developer",
        "Backend Developer",
        "Data Analyst",
        "Full Stack Developer",
        "DevOps Engineer",
        "Mobile Developer",
    ];

    const handleAnalyze = async () => {
        setError("");

        if (!targetRole.trim()) {
            setError("Please select a target role");
            return;
        }

        if (!currentSkillsInput.trim()) {
            setError("Please enter at least one skill");
            return;
        }

        const skills = currentSkillsInput
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);

        if (skills.length === 0) {
            setError("Please enter valid skills separated by commas");
            return;
        }

        setLoading(true);

        try {
            // Store the inputs in session storage to use on dashboard
            sessionStorage.setItem(
                "careerAnalysis",
                JSON.stringify({ targetRole, currentSkills: skills })
            );

            // Fetch skill gap analysis
            const skillGapResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/skill-gap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetRole, currentSkills: skills }),
            });

            if (!skillGapResponse.ok) {
                const errorData = await skillGapResponse.json();
                setError(errorData.error || "Failed to analyze skills");
                setLoading(false);
                return;
            }

            // Fetch roadmap
            const roadmapResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roadmap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetRole }),
            });

            if (!roadmapResponse.ok) {
                const errorData = await roadmapResponse.json();
                setError(errorData.error || "Failed to generate roadmap");
                setLoading(false);
                return;
            }

            // Navigate to dashboard
            navigate("/dashboard");
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        Career Roadmap Builder
                    </h1>
                    <p className="text-lg text-gray-700">
                        Analyze your skills and get a personalized learning path to reach your career goals
                    </p>
                </div>

                {/* Main Card */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-t-lg">
                        <CardTitle className="text-2xl">Analyze Your Career Path</CardTitle>
                        <CardDescription className="text-blue-50">
                            Enter your target role and current skills to get started
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-2">
                        <div className="space-y-6">
                            {/* Target Role */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Target Role
                                </label>
                                <select
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                >
                                    <option value="">Select a role...</option>
                                    {availableRoles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Current Skills */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Current Skills
                                </label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Enter skills separated by commas (e.g., JavaScript, React, Git)
                                </p>
                                <textarea
                                    value={currentSkillsInput}
                                    onChange={(e) => setCurrentSkillsInput(e.target.value)}
                                    placeholder="e.g., JavaScript, React, HTML, CSS"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                    rows={4}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                            >
                                {loading ? "Analyzing..." : "Analyze My Career Path"}
                            </Button>

                            {/* Info Box */}
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Available roles:</strong> Frontend Developer, Backend Developer, Data Analyst, Full Stack Developer, DevOps Engineer, Mobile Developer
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Get a detailed skill gap analysis and personalized learning roadmap
                    </p>
                </div>
            </div>
        </div>
    );
}
