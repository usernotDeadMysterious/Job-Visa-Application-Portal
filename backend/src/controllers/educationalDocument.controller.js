import Document from "../models/Document.js";
import fs from "fs";
import path from "path";

const TEMP_USER_ID = "69331045ad83a1a2334d3e68";

const EDUCATION_TYPES = ["DEGREE", "TRANSCRIPT"];

/**
 * Upload educational document (single)
 */
export const uploadEducationalDocument = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || !EDUCATION_TYPES.includes(type)) {
      return res.status(400).json({
        message: "Invalid educational document type",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Optional: limit max 2 educational docs
    const count = await Document.countDocuments({
      userId: TEMP_USER_ID,
      type: { $in: EDUCATION_TYPES },
    });

    if (count >= 2) {
      return res.status(400).json({
        message: "Only 2 educational documents allowed",
      });
    }

    const document = await Document.create({
      user: TEMP_USER_ID,
      userId: TEMP_USER_ID,
      type,
      filePath: req.file.path,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get educational documents
 */
export const getEducationalDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      userId: TEMP_USER_ID,
      type: { $in: EDUCATION_TYPES },
    }).sort({ createdAt: -1 });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete educational document
 */
export const deleteEducationalDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOne({
      _id: id,
      userId: TEMP_USER_ID,
      type: { $in: EDUCATION_TYPES },
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // delete file from disk
    const absolutePath = path.resolve(document.filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    await document.deleteOne();

    res.json({ message: "Educational document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
