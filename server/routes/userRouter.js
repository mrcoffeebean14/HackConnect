import express from 'express';
import passport from 'passport';
import User from '../models/user.js';

const router = express.Router({ mergeParams: true });

// REGISTER ROUTE (keep this unchanged if already working)
router.post('/register', async (req, res, next) => {
  try {
    console.log('Incoming register body:', req.body);

    const { username, email, password } = req.body;

    // Optional fields — fallback to safe defaults if not sent
    const bio = '';
    const location = '';
    const profilePicture = '';
    const skills = [];
    const interests = '';

    const socials = {
      github:'',
      linkedin: '',
      twitter: '',
      website: ''
    };
    const Projects = [];

    // Create the user document with all schema fields
    const user = new User({
      email,
      username,
      bio,
      location,
      profilePicture,
      skills,
      interests,
      socials,
      Projects
    });

    // Register with passport-local-mongoose
    const registeredUser = await User.register(user, password);

    // Log the user in
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: registeredUser._id,
          email: registeredUser.email,
          username: registeredUser.username,
          bio: registeredUser.bio,
          location: registeredUser.location,
          profilePicture: registeredUser.profilePicture,
          skills: registeredUser.skills,
          interests: registeredUser.interests,
          socials: registeredUser.socials,
          Projects : registeredUser.Projects
        }
      });
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ LOGIN ROUTE
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Login failed' });

      res.json({
        message: 'Logged in successfully!',
        user: {
          id: user._id,
          email: user.email
        }
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // delete session cookie
      return res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  });
});

export default router;
