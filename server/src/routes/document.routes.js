// document.routes.js 
import express from "express";

import { uploadSingle } from "../config/multer.js";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/document.controller.js";
import { dummyMW } from "../middleware/dummyMW.js";

const router = express.Router();

// Upload document
router.post("/", dummyMW,uploadSingle, uploadDocument);

// Get all documents
router.get("/", dummyMW, getDocuments);

// Delete document by ID
router.delete("/:id",dummyMW, deleteDocument);

export default router;
