// Profile Route 
import express from "express";
import { getProfile, upsertProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", upsertProfile);

export default router;
