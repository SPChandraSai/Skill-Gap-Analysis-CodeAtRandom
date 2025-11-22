const ROADMAPS = {
    "Frontend Developer": {
        role: "Frontend Developer",
        phases: [
            {
                phase: 1,
                duration: "1–2 months",
                topics: [
                    "HTML basics",
                    "CSS fundamentals",
                    "JavaScript ES6+",
                    "Git version control",
                ],
            },
            {
                phase: 2,
                duration: "2 months",
                topics: [
                    "React fundamentals",
                    "Component lifecycle",
                    "State management",
                    "React Router",
                ],
            },
            {
                phase: 3,
                duration: "1–2 months",
                topics: [
                    "Advanced React patterns",
                    "Performance optimization",
                    "Testing (Jest, React Testing Library)",
                    "Deployment and CI/CD",
                ],
            },
        ],
    },
    "Backend Developer": {
        role: "Backend Developer",
        phases: [
            {
                phase: 1,
                duration: "1–2 months",
                topics: ["Java basics", "OOP concepts", "Git version control"],
            },
            {
                phase: 2,
                duration: "2 months",
                topics: ["Spring Boot", "SQL and databases", "RESTful APIs", "Authentication"],
            },
            {
                phase: 3,
                duration: "1–2 months",
                topics: [
                    "Deployment",
                    "System design basics",
                    "Testing",
                    "Real-world projects",
                ],
            },
        ],
    },
    "Data Analyst": {
        role: "Data Analyst",
        phases: [
            {
                phase: 1,
                duration: "1–2 months",
                topics: ["Excel mastery", "SQL basics", "Data cleaning"],
            },
            {
                phase: 2,
                duration: "2 months",
                topics: [
                    "Python for data analysis",
                    "Data visualization",
                    "Statistical analysis",
                ],
            },
            {
                phase: 3,
                duration: "1–2 months",
                topics: [
                    "Business intelligence tools",
                    "Dashboard creation",
                    "Real-world projects",
                    "Data storytelling",
                ],
            },
        ],
    },
    "Full Stack Developer": {
        role: "Full Stack Developer",
        phases: [
            {
                phase: 1,
                duration: "1–2 months",
                topics: [
                    "Frontend basics (HTML, CSS, JavaScript)",
                    "Backend basics (Node.js, Express)",
                    "Git version control",
                ],
            },
            {
                phase: 2,
                duration: "2–3 months",
                topics: [
                    "React",
                    "Databases (SQL, MongoDB)",
                    "APIs and REST",
                    "Authentication",
                ],
            },
            {
                phase: 3,
                duration: "1–2 months",
                topics: [
                    "DevOps basics",
                    "Deployment",
                    "Testing",
                    "Real-world full-stack projects",
                ],
            },
        ],
    },
    "DevOps Engineer": {
        role: "DevOps Engineer",
        phases: [
            {
                phase: 1,
                duration: "1–2 months",
                topics: ["Linux fundamentals", "Shell scripting", "Git basics"],
            },
            {
                phase: 2,
                duration: "2–3 months",
                topics: ["Docker basics", "Kubernetes", "CI/CD pipelines"],
            },
            {
                phase: 3,
                duration: "1–2 months",
                topics: [
                    "Cloud platforms (AWS, GCP, Azure)",
                    "Infrastructure as Code",
                    "Monitoring and logging",
                ],
            },
        ],
    },
    "Mobile Developer": {
        role: "Mobile Developer",
        phases: [
            {
                phase: 1,
                duration: "1–2 months",
                topics: [
                    "JavaScript/TypeScript",
                    "React Native fundamentals",
                    "Mobile UI/UX basics",
                ],
            },
            {
                phase: 2,
                duration: "2 months",
                topics: [
                    "Advanced React Native",
                    "Native modules",
                    "State management",
                    "APIs integration",
                ],
            },
            {
                phase: 3,
                duration: "1–2 months",
                topics: [
                    "Testing and debugging",
                    "Performance optimization",
                    "App deployment",
                    "Real-world projects",
                ],
            },
        ],
    },
};

function getRoadmap(targetRole) {
    if (!targetRole) {
        return { status: 400, error: "targetRole is required" };
    }

    const normalizedRole = Object.keys(ROADMAPS).find(
        (role) => role.toLowerCase() === targetRole.toLowerCase()
    );

    if (!normalizedRole) {
        return {
            status: 404,
            error: `Roadmap for "${targetRole}" not found. Available roles: ${Object.keys(
                ROADMAPS
            ).join(", ")}`,
        };
    }

    return { status: 200, roadmap: ROADMAPS[normalizedRole] };
}

module.exports = {
    getRoadmap,
};
