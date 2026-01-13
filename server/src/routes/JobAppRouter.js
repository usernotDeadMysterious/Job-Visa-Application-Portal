// routes/jobApplication.routes.js
import express from "express";
import { applyForJob } from "../controllers/newJAC.js";
import { dummyMW } from "../middleware/dummyMW.js";
import JobApplication from "../models/JobApplication.js";


const router = express.Router();

router.post("/apply", dummyMW, applyForJob);
// GET applied jobs for logged-in user
router.get("/my",dummyMW , async (req, res) => {
  const apps = await JobApplication.find({ userId: req.user._id })
    .populate("jobId"); // IMPORTANT

  res.json(apps);
});


export default router;
