// Profile Controller 
import Profile from '../models/Profile.js'


export const getProfile = async (req,res) => {
    try{
      const USER_ID = req.user._id;
        const profile = await Profile.findOne({userId: USER_ID });
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
    const USER_ID = req.user._id;
    const profile = await Profile.findOneAndUpdate(
      { userId: USER_ID },
      { ...req.body, userId: USER_ID },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};