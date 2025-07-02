import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

// Use email as username
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email' // 👈 tells passport to treat email as the username
});

export default mongoose.model('User', UserSchema);
