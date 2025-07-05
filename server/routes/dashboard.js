import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects
} from "../config/Project Controllers.js";
import isAuthenticated from '../middleware/isAuthticated.js';

// GET /dashboard/profile - fetch logged-in user's profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user._id;
    const user = await User.findById(userId).select('-hash -salt').lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

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

// PUT /dashboard/profile - update profile info
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user._id;
    const {
      username,
      bio,
      location,
      profilePicture,
      skills,
      interests,
      socials
    } = req.body;

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
    ).select('-hash -salt').lean();

    const safeProfile = {
      username: updated.username || '',
      bio: updated.bio || '',
      location: updated.location || '',
      profilePicture: updated.profilePicture || null,
      skills: Array.isArray(updated.skills) ? updated.skills : [],
      interests: updated.interests || '',
      socials: {
        github: updated.socials?.github || '',
        linkedin: updated.socials?.linkedin || '',
        twitter: updated.socials?.twitter || '',
        website: updated.socials?.website || ''
      }
    };

    res.json(safeProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /dashboard/projects - fetch all projects
router.get("/projects", isAuthenticated, getAllProjects);

// POST /dashboard/projects - add a new project
router.post("/projects", isAuthenticated, addProject);

// PUT /dashboard/projects/:projectId - update a specific project
router.put("/projects/:projectId", isAuthenticated, updateProject);

// DELETE /dashboard/projects/:projectId - delete a project
router.delete("/projects/:projectId", isAuthenticated, deleteProject);

export default router;
