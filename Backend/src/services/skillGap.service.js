const ROLE_SKILLS = {
    "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
    "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
    "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"],
    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "SQL",
        "Git",
    ],
    "DevOps Engineer": ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS"],
    "Mobile Developer": ["React Native", "Swift", "Kotlin", "Git", "APIs"],
};

function normalizeRole(targetRole) {
    return Object.keys(ROLE_SKILLS).find(
        (role) => role.toLowerCase() === targetRole.toLowerCase()
    );
}

function generateRecommendations(role) {
    const recommendations = {
        "Frontend Developer": [
            "Build responsive web applications",
            "Practice component-based architecture",
            "Learn state management libraries",
            "Study accessibility standards",
        ],
        "Backend Developer": [
            "Master database design and optimization",
            "Learn API design best practices",
            "Study microservices architecture",
            "Practice security and authentication",
        ],
        "Data Analyst": [
            "Master data visualization techniques",
            "Learn statistical analysis",
            "Study business intelligence tools",
            "Practice data storytelling",
        ],
        "Full Stack Developer": [
            "Build end-to-end projects",
            "Learn DevOps basics",
            "Master database and backend concepts",
            "Study frontend frameworks deeply",
        ],
        "DevOps Engineer": [
            "Master containerization",
            "Learn infrastructure as code",
            "Study cloud platforms",
            "Practice automation and monitoring",
        ],
        "Mobile Developer": [
            "Build cross-platform applications",
            "Learn mobile UI/UX principles",
            "Study native development",
            "Practice app deployment and distribution",
        ],
    };

    return recommendations[role] || [];
}

function generateLearningOrder(missingSkills) {
    // Simple heuristic: foundational skills first
    const foundational = ["HTML", "CSS", "JavaScript", "Python", "Java"];
    const advanced = ["React", "Spring Boot", "AWS", "Kubernetes"];

    const ordered = [];

    foundational.forEach((skill) => {
        const found = missingSkills.find(
            (s) => s.toLowerCase() === skill.toLowerCase()
        );
        if (found) ordered.push(found);
    });

    // add advanced if present
    advanced.forEach((skill) => {
        const found = missingSkills.find(
            (s) => s.toLowerCase() === skill.toLowerCase()
        );
        if (found && !ordered.includes(found)) ordered.push(found);
    });

    // add any remaining skills
    missingSkills.forEach((skill) => {
        if (!ordered.includes(skill)) ordered.push(skill);
    });

    return ordered;
}

function analyzeSkillGap(targetRole, currentSkills) {
    const normalizedRole = normalizeRole(targetRole);

    if (!normalizedRole) {
        return {
            error: `Role "${targetRole}" not found. Available roles: ${Object.keys(
                ROLE_SKILLS
            ).join(", ")}`,
        };
    }

    const requiredSkills = ROLE_SKILLS[normalizedRole];
    const normalizedCurrentSkills = currentSkills.map((skill) =>
        skill.toLowerCase()
    );

    const matchedSkills = requiredSkills.filter((skill) =>
        normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
        (skill) => !normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    const recommendations = generateRecommendations(normalizedRole);
    const suggestedLearningOrder = generateLearningOrder(missingSkills);

    return {
        matchedSkills,
        missingSkills,
        recommendations,
        suggestedLearningOrder,
    };
}

module.exports = {
    analyzeSkillGap,
};
