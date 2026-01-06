// Education Routes 
import express from "express";
import {
  getEducation,
  upsertEducation
} from "../controllers/education.controller.js";

const router = express.Router();

router.get("/", getEducation);
router.put("/", upsertEducation);

export default router;
