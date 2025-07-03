import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true }, // used by passport-local-mongoose, but your `username` field can be the same as name or email if you want
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
});

// Use email as the login field instead of username
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export default mongoose.model("User", UserSchema);
