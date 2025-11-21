const axios = require('axios');

// @desc    Get Instagram account statistics
// @route   GET /api/instagram/stats
// @access  Private
const getInstagramStats = async (req, res) => {
  try {
    const { accountId } = req.query;
    
    if (!accountId) {
      return res.status(400).json({ message: 'Account ID is required' });
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ message: 'Instagram access token not configured' });
    }

    // Get account information
    const accountResponse = await axios.get(
      `https://graph.instagram.com/${accountId}?fields=id,username,account_type,media_count,followers_count,follows_count&access_token=${accessToken}`
    );

    const account = accountResponse.data;

    // Get recent media
    const mediaResponse = await axios.get(
      `https://graph.instagram.com/${accountId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&limit=10&access_token=${accessToken}`
    );

    const recentMedia = mediaResponse.data.data.map(post => ({
      id: post.id,
      caption: post.caption,
      mediaType: post.media_type,
      mediaUrl: post.media_url,
      thumbnailUrl: post.thumbnail_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      likeCount: post.like_count,
      commentCount: post.comments_count
    }));

    // Calculate engagement rate
    const totalLikes = recentMedia.reduce((sum, post) => sum + (post.likeCount || 0), 0);
    const totalComments = recentMedia.reduce((sum, post) => sum + (post.commentCount || 0), 0);
    const totalEngagement = totalLikes + totalComments;
    const engagementRate = account.followers_count > 0 ? 
      ((totalEngagement / recentMedia.length) / account.followers_count) * 100 : 0;

    const response = {
      accountInfo: {
        accountId: account.id,
        username: account.username,
        accountType: account.account_type,
        followersCount: account.followers_count,
        followsCount: account.follows_count,
        mediaCount: account.media_count
      },
      recentMedia,
      engagement: {
        totalLikes,
        totalComments,
        totalEngagement,
        engagementRate: Math.round(engagementRate * 100) / 100
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Instagram API error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to fetch Instagram data',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

// @desc    Get Instagram media insights
// @route   GET /api/instagram/insights
// @access  Private
const getInstagramInsights = async (req, res) => {
  try {
    const { accountId } = req.query;
    
    if (!accountId) {
      return res.status(400).json({ message: 'Account ID is required' });
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ message: 'Instagram access token not configured' });
    }

    // Get account insights (requires Instagram Business Account)
    const insightsResponse = await axios.get(
      `https://graph.instagram.com/${accountId}/insights?metric=impressions,reach,profile_views&period=day&since=${Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60}&until=${Math.floor(Date.now() / 1000)}&access_token=${accessToken}`
    );

    res.json(insightsResponse.data);
  } catch (error) {
    console.error('Instagram insights error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to fetch Instagram insights',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

module.exports = {
  getInstagramStats,
  getInstagramInsights,
};
