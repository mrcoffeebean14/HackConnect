import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      name: req.user.username,
      email: req.user.email
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;
