// Profile Route 
import express from "express";
import { getProfile, upsertProfile } from "../controllers/profile.controller.js";
import { dummyMW } from "../middleware/dummyMW.js";

const router = express.Router();

router.get("/", dummyMW,getProfile);
router.put("/", dummyMW,upsertProfile);

export default router;
