import express from "express";
import { getJobs, getJobById } from "../controllers/job.controller.js";

const router = express.Router();

/**
 * Public job APIs
 */
router.get("/", getJobs);        // Fetch all jobs
router.get("/:id", getJobById);  // Fetch single job

export default router;
