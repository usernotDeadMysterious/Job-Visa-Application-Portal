// Document Controller 
import Document from "../models/Document.js";
import fs from "fs";
import path from "path";

const TEMP_USER_ID = "695b49c87055956ce99aff06";

/**
 * Upload a document
 */
export const uploadDocument = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Document type is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
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
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get all documents for user
 */


export const getDocuments = async (req, res) => {
  try {
    const filter = { userId: TEMP_USER_ID };

    if (req.query.type) {
      filter.type = req.query.type;
    }

    const documents = await Document.find(filter).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * Delete a document
 */
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOne({
      _id: id,
      userId: TEMP_USER_ID,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    
    }


    // delete file from disk
    if (document.filePath) {
      const absolutePath = path.resolve(document.filePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    // delete mongo record
    await document.deleteOne();

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
