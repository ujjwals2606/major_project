const express = require('express');
const { getInstagramStats, getInstagramInsights } = require('../controllers/instagramController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/instagram/stats
// @desc    Get Instagram account statistics
// @access  Private
router.get('/stats', getInstagramStats);

// @route   GET /api/instagram/insights
// @desc    Get Instagram account insights
// @access  Private
router.get('/insights', getInstagramInsights);

module.exports = router;
