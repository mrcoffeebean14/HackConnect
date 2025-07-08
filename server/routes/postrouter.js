import express from 'express';
import post from '../models/post.js';
const router = express.Router();
import isAuthenticated from '../middleware/isAuthticated.js';
import comments from '../models/comments.js';

router.post('/create', isAuthenticated, async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.user._id;
    const { content, link, Gitlink } = req.body;
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
    const userId = req.user._id;
    const posts = await post.find().populate('createdBy').sort({ createdAt: -1 });
    // Get comment counts for all posts
    const postIds = posts.map(p => p._id);
    const commentCounts = await comments.aggregate([
      { $match: { postId: { $in: postIds } } },
      { $group: { _id: '$postId', count: { $sum: 1 } } }
    ]);
    const commentCountMap = {};
    commentCounts.forEach(cc => { commentCountMap[cc._id.toString()] = cc.count; });
    const postsWithIsLiked = posts.map(p => {
      const pObj = p.toObject();
      pObj.isLiked = p.likes.includes(userId);
      pObj.commentCount = commentCountMap[p._id.toString()] || 0;
      return pObj;
    });
    res.status(200).json(postsWithIsLiked);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
})
// Add this after your other routes
// Add this to server/routes/postrouter.js
router.post('/:id/like', isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const postDoc = await post.findById(postId);
    if (!postDoc) return res.status(404).json({ error: 'Post not found' });

    const alreadyLiked = postDoc.likes.includes(userId);
    if (alreadyLiked) {
      postDoc.likes.pull(userId);
    } else {
      postDoc.likes.push(userId);
    }
    await postDoc.save();
    res.status(200).json({ likes: postDoc.likes, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});
// Delete a post (only by creator)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const postDoc = await post.findById(postId);
    if (!postDoc) return res.status(404).json({ error: 'Post not found' });
    if (postDoc.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }
    await post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Get all comments for a post (returns array)
router.get('/comments/:id', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const commentList = await comments.find({ postId: postId }).populate('createdBy');
    const commentsWithIsLiked = commentList.map(c => {
      const cObj = c.toObject();
      cObj.isLiked = c.likes.includes(userId);
      return cObj;
    });
    res.status(200).json(commentsWithIsLiked);
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
router.post('/comment/:id/like', isAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;
    const commentDoc = await comments.findById(commentId);
    if (!commentDoc) return res.status(404).json({ error: 'Comment not found' });

    const alreadyLiked = commentDoc.likes.includes(userId);
    if (alreadyLiked) {
      commentDoc.likes.pull(userId);
    } else {
      commentDoc.likes.push(userId);
    }
    await commentDoc.save();
    res.status(200).json({ likes: commentDoc.likes, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});



// Delete a comment (only by creator)
router.delete('/comment/:id', isAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;
    const commentDoc = await comments.findById(commentId);
    if (!commentDoc) return res.status(404).json({ error: 'Comment not found' });
    if (commentDoc.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    }
    await comments.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});


export default router;