import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true }
});

// Use email as the login field instead of username
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

export default mongoose.model('User', UserSchema);
