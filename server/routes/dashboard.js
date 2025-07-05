import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects
} from "../config/Project Controllers.js";

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
};

// Example Express routes

// GET profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // Passport.js session user
    const user = await User.findById(userId).lean();
    if (!user) {return res.status(404).json({ error: 'User not found' });}
    // 🛡️ Safe fallback shape
    const safeProfile = {
      username: user.username || '',
      bio: user.bio || '',
      location: user.location || '',
      profilePicture: user.profilePicture || null,
      skills: Array.isArray(user.skills) ? user.skills : [],
      interests: user.interests || '',
      socials: {
        github: user.socials?.github || '',
        linkedin: user.socials?.linkedin || '',
        twitter: user.socials?.twitter || '',
        website: user.socials?.website || ''
      }
    };
    res.json(safeProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT profile
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, bio, location, profilePicture, skills, interests, socials } = req.body;
    console.log(req.body)
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        username: username || '',
        bio: bio || '',
        location: location || '',
        profilePicture: profilePicture || null,
        skills: Array.isArray(skills) ? skills : [],
        interests: interests || '',
        socials: {
          github: socials?.github || '',
          linkedin: socials?.linkedin || '',
          twitter: socials?.twitter || '',
          website: socials?.website || ''
        }
      },
      { new: true }
    ).lean();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET all projects for a user
router.get("/projects", isAuthenticated, getAllProjects);

// ADD new project
router.post("/projects", isAuthenticated, addProject);

// UPDATE a project
router.put("/projects/:projectId", isAuthenticated, updateProject);

// DELETE a project
router.delete("/projects/:projectId", isAuthenticated, deleteProject);



export default router;
