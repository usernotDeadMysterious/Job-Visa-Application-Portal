// Education Routes 
import express from "express";
import {
  getEducation,
  upsertEducation
} from "../controllers/education.controller.js";
import { dummyMW } from "../middleware/dummyMW.js";

const router = express.Router();

router.get("/", dummyMW,getEducation);
router.put("/", dummyMW,upsertEducation);

export default router;
