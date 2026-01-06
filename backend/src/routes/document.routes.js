// document.routes.js 
import express from "express";

import { uploadSingle } from "../config/multer.js";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

// Upload document
router.post("/", uploadSingle, uploadDocument);

// Get all documents
router.get("/", getDocuments);

// Delete document by ID
router.delete("/:id", deleteDocument);

export default router;
