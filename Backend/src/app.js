const express = require("express");
const cors = require("cors");

// Routers
const demoRouter = require("./routers/demo.routes");
const skillGapRouter = require("./routers/skillGap.routes");
const roadmapRouter = require("./routers/roadmap.routes");
const hackerNewsRouter = require("./routers/hackerNews.routes");

require("dotenv").config();

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173", // adjust if your frontend URL is different
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / ping route --> It's just an acknowledge message to verify server is running
app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE || "ping";
    res.json({ message: ping });
});

// Routes
app.use("/api/skill-gap", skillGapRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/hackernews", hackerNewsRouter);

module.exports = app;
