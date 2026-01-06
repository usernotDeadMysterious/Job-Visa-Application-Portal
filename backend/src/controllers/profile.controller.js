// Profile Controller 
import Profile from '../models/Profile.js'

const TEMP_USER_ID = "695b49c87055956ce99aff06";
export const getProfile = async (req,res) => {
    try{
        const profile = await Profile.findOne({userId: TEMP_USER_ID });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
    }
    catch(error){
        res.status(500).json({ message: "Server error" });
    }
};

export const upsertProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: TEMP_USER_ID },
      { ...req.body, userId: TEMP_USER_ID },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};