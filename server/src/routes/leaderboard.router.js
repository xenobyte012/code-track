import express from "express";
import { leaderboard } from "../controllers/leaderboard.controller";

const router = express.Router();

router.get("leaderboard" , leaderboard)

export default router