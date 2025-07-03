import express from 'express';
const router = express.Router();
import User from '../models/user.js';

// Example Express routes

// GET profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user?._id; // Passport.js session user
    if (!userId) {return res.status(401).json({ error: 'Not authenticated' });}
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
router.put('/profile', async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });
    const { username, bio, location, profilePicture, skills, interests, socials } = req.body;
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



export default router;
