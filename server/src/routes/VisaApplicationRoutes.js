import express from "express";
import {
  applyForVisa,
  getMyVisaApplications,
  getVisaApplicationById,
} from "../controllers/VisaApplicationController.js";
import { dummyMW } from "../middleware/dummyMW.js";

const router = express.Router();

// Apply for visa
router.post("/apply", dummyMW, applyForVisa);

// Get all applications of logged-in user
router.get("/my-applications", dummyMW, getMyVisaApplications);

// Get single application (own)
router.get("/:id", dummyMW, getVisaApplicationById);

export const VisaRoutes = router;
