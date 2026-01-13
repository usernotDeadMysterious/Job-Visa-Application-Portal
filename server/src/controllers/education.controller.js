// Education Controller 

import Education from "../models/Education.js";


/**
 * GET education details for user
 */
export const getEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const education = await Education.find({ userId });

    if (!education || education.length === 0) {
      return res.status(404).json({ message: "Education details not found" });
      
    }
    
    res.json(education);
    console.log('Education Details Found')
  } catch (error) {

    res.status(500).json({ message: "Server error" });
    console.log('Server Error Education Details not found')
  }
};

/**
 * UPSERT education
 * (delete old records and insert new ones from form)
 */
export const upsertEducation = async (req, res) => {
  try {
    // Expecting an array from frontend form
    const educationData = req.body;
    const userId = req.user._id;

    // Remove existing education records
    await Education.deleteMany({ userId});

    // Add userId to each education entry
    const formattedData = educationData.map(item => ({
      ...item,
      userId,
    }));

    const education = await Education.insertMany(formattedData);

    res.json(education);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
