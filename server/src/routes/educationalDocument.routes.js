import express from "express";
import { uploadSingle } from "../config/multer.js";
import {
  uploadEducationalDocument,
  getEducationalDocuments,
  deleteEducationalDocument,
} from "../controllers/educationalDocument.controller.js";
import { dummyMW } from "../middleware/dummyMW.js";

const router = express.Router();

// Upload DEGREE or TRANSCRIPT
router.post("/", dummyMW,uploadSingle, uploadEducationalDocument);

// Get all educational documents
router.get("/", dummyMW, getEducationalDocuments);

// Delete educational document
router.delete("/:id", dummyMW, deleteEducationalDocument);

export default router;
