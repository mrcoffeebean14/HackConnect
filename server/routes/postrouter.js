import express from 'express';
import post from '../models/post.js';
const router = express.Router();
import isAuthenticated from '../middleware/isAuthticated.js';
import comments from '../models/comments.js';

router.post('/create', isAuthenticated ,async (req, res) => {
    console.log(req.body);
    try {
        const userId = req.user._id;
        const { content, link ,Gitlink } = req.body;
        const newPost = new post({
            content,
            createdBy: userId,
            link,
            Gitlink,
            Image: [],
            Commentid: null,
            likes: []
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });   
    }

});

router.get('/all', isAuthenticated, async (req, res) => {
    try {
        const posts = await post.find().populate('createdBy').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
})

// Get all comments for a post (returns array)
router.get('/comments/:id', isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const commentList = await comments.find({ postId: postId }).populate('createdBy');
    res.status(200).json(commentList);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add new comment for a post (returns the new comment only)
router.post('/comments/:id', isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const comment = new comments({
      content: req.body.content,
      createdBy: userId,
      postId: postId,
    });
    await comment.save();
    await comment.populate('createdBy'); // ✅ Populate before sending back!
    res.status(201).json({ comment });   // ✅ Send only `comment`
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});


export default router;