import JobPosting from "../models/JobPosting.js";

/**
 * GET /api/jobs
 * Search & fetch active jobs
 */
export const getJobs = async (req, res) => {
  try {
    const {
      q,
      city,
      country,
      position,
      industry,
      type,
    } = req.query;

    const filter = {
      isActive: true,
    };

    // 🔍 Keyword search
    if (q && q.trim() !== "") {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { industry: { $regex: q, $options: "i" } },
        { position: { $regex: q, $options: "i" } },
      ];
    }

    // 📍 Location filters
    if (city) {
      filter.city = { $regex: `^${city}$`, $options: "i" };
    }

    if (country) {
      filter.country = { $regex: `^${country}$`, $options: "i" };

    }

    // 💼 Job attributes
    if (position) {
      filter.position = { $regex: `^${position}$`, $options: "i" };
    }

    if (industry) {
      filter.industry = { $regex: `^${industry}$`, $options: "i" };
    }

    if (type) {
      filter.type = { $regex: `^${type}$`, $options: "i" };
    }

    const jobs = await JobPosting.find(filter)
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/jobs/:id
 * Fetch single job by ID
 */
export const getJobById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);

    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("GET /api/jobs/:id ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
