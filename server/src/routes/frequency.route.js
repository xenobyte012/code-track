import express from "express";
import { weeklyCommits, weeklyCommitsDetailed, commitsByDate } from "../controllers/frequency.controller.js";

const router = express.Router();

router.get("/weekly-commits", weeklyCommits)
router.get("/weekly-commits-detailed", weeklyCommitsDetailed );
router.get("/commits-by-date", commitsByDate);
export default router;