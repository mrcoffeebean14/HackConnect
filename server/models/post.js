import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Gitlink: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    Image:[{
        type: String,
        default: '',
    }],
    Commentid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: null,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
    }],
    createdAt: {
        type: Date,
        default: Date.now,} 
})

export default mongoose.model("Post", postSchema);