import express from 'express';
import passport from 'passport';
import User from '../models/user.js';

const router = express.Router({ mergeParams: true });

// REGISTER ROUTE (keep this unchanged if already working)
router.post('/register', async (req, res, next) => {
  try {
    console.log(req.body)
    const { username,email, password } = req.body;
    const user = new User({ email,username });

    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json({
        success: true,
        message: 'User registered',
        user: {
          id: registeredUser._id,
          email: registeredUser.email,
          username:registeredUser.username
        }
      });
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
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

router.get('/dashboard', (req, res) => {
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
