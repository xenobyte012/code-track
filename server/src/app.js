import express from "express";
import path from "path";
import cors from "cors";
import axios from "cors";
import "dotenv/config";
import overview from "./routes/overview.route.js"
import profile from "./routes/profile.route.js"
import frequency from "./routes/frequency.route.js"
import heatmapRoutes from "./routes/heatmap.routes.js"
import leaderboard from "./controllers/leaderboard.controller.js";
const app = express();
//app.use(cors())
app.use(express.json());
// app.use(express.json());
// 1. Add your known fixed URLs here
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.18.36:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      console.log("Origin:", origin);

      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        (origin.endsWith(".vercel.app"))
      ) {
        return callback(null, true);
      }

      console.log("Blocked:", origin);

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use("/api/github", overview )
app.use("/api/github", profile );
app.use("/api/github", frequency)
app.use("/api/github", heatmapRoutes);
app.use("/api/github", leaderboard);

app.get("/api/github/ping", (req, res) => {
  res.json({
    success: true,
    message: "Code Tracker API Running",
  });
});

export default app;