// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/user.js';
import userRouter from './routes/userRouter.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// SESSION SETUP
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    secure: process.env.NODE_ENV === 'production',
  },
}));

// PASSPORT INIT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Try to find user by googleId
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // If not found, try to find by email
      user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // If found by email, link Google account
        user.googleId = profile.id;
        await user.save();
      } else {
        // If not found by email, create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          bio: '',
          location: '',
          profilePicture: profile.photos?.[0]?.value || '',
          skills: [],
          interests: '',
          socials: {},
          projects: [],
        });
      }
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// GOOGLE AUTH ROUTES
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: true,
  }),
  (req, res) => {
    res.redirect('http://localhost:5173/dashboard');
  }
);

// ROUTES
app.get('/', (req, res) => {
  res.send("API running");
});
app.use('/', userRouter);
app.use('/dashboard', dashboardRouter);

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
