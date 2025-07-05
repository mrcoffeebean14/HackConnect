import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Reusable embedded Project schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  techStack: [{ type: String, default: [] }],
  githubLink: { type: String, default: "", trim: true },
  liveLink: { type: String, default: "", trim: true },
  imageUrl: { type: String, default: "", trim: true },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'on-hold', 'unknown'],
    default: 'unknown',
  },
  createdAt: { type: Date, default: Date.now }
});

// User schema with projects
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  skills: [{ type: String, default: [] }],
  interests: { type: String, default: "" },
  socials: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  projects: [ProjectSchema]
});

// Use email as the login field instead of username
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export default mongoose.model("User", UserSchema);
