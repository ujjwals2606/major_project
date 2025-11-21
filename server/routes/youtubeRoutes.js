const express = require('express');
const { getYouTubeStats, searchYouTubeChannels } = require('../controllers/youtubeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/youtube/stats
// @desc    Get YouTube channel statistics
// @access  Private
router.get('/stats', getYouTubeStats);

// @route   GET /api/youtube/search
// @desc    Search YouTube channels
// @access  Private
router.get('/search', searchYouTubeChannels);

module.exports = router;
