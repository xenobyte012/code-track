import express from "express";
import { getHeatmapData } from "../controllers/heatmap.controller.js";

const router = express.Router();

/**
 * @route   GET /api/github/heatmap
 * @desc    Get heatmap data for a specific year
 * @param   {string} year - Year to fetch data for (optional, defaults to current year)
 * @returns {Object} Heatmap data with daily commit counts
 *
 * @example
 * GET /api/github/heatmap?year=2026
 * Response:
 * {
 *   "success": true,
 *   "year": 2026,
 *   "totalCommits": 1247,
 *   "data": [
 *     { "date": "2026-01-01", "count": 3 },
 *     { "date": "2026-01-02", "count": 5 },
 *     ...
 *   ]
 * }
 */
router.get("/heatmap", getHeatmapData);

/**
 * @route   GET /api/github/heatmap/current
 * @desc    Get heatmap data for the current year
 * @returns {Object} Heatmap data with daily commit counts
 */
router.get("/heatmap/current", async (req, res) => {
  // Forward to the main endpoint with current year
  req.query.year = new Date().getFullYear();
  await getHeatmapData(req, res);
});

/**
 * @route   GET /api/github/heatmap/years
 * @desc    Get available years with commit data
 * @returns {Object} List of years that have commit data
 */
router.get("/heatmap/years", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const years = [];

    // Return last 5 years
    for (let y = currentYear; y >= currentYear - 5; y--) {
      years.push(y);
    }

    res.json({
      success: true,
      years: years,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch available years",
    });
  }
});

export default router;
