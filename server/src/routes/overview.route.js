import express from "express";

import {
  totalRepos,
  totalContribution,
  getCurrentStreak,
} from "../controllers/overview.controller.js";

const router = express.Router();

router.get("/totalrepos", totalRepos);
router.get("/totalcontribution", totalContribution);
router.get("/streak", getCurrentStreak);
export default router;