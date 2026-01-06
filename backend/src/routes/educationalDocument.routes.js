import express from "express";
import { uploadSingle } from "../config/multer.js";
import {
  uploadEducationalDocument,
  getEducationalDocuments,
  deleteEducationalDocument,
} from "../controllers/educationalDocument.controller.js";

const router = express.Router();

// Upload DEGREE or TRANSCRIPT
router.post("/", uploadSingle, uploadEducationalDocument);

// Get all educational documents
router.get("/", getEducationalDocuments);

// Delete educational document
router.delete("/:id", deleteEducationalDocument);

export default router;
