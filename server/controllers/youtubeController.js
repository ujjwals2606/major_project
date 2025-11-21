const axios = require('axios');

// @desc    Get YouTube channel statistics
// @route   GET /api/youtube/stats
// @access  Private
const getYouTubeStats = async (req, res) => {
  try {
    const { youtubeChannelId } = req.body;
    
    if (!youtubeChannelId) {
      return res.status(400).json({ message: 'Channel ID is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'YouTube API key not configured' });
    }

    // Get channel statistics
    const channelResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${youtubeChannelId}&key=${apiKey}`
    );

    if (channelResponse.data.items.length === 0) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const channel = channelResponse.data.items[0];
    const stats = channel.statistics;
    const snippet = channel.snippet;

    // Get latest videos
    const videosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelId}&type=video&order=date&maxResults=5&key=${apiKey}`
    );

    const latestVideos = videosResponse.data.items
      .filter(video => video.id?.videoId)
      .map(video => ({
        videoId: video.id.videoId,
        title: video.snippet.title,
        publishedAt: video.snippet.publishedAt,
        thumbnail: video.snippet.thumbnails.medium.url
      }));

    const videoIds = latestVideos.map(video => video.videoId).join(',');

    // No videos
    if (!videoIds) {
      return res.json({
        channelInfo: {
          youtubeChannelId: channel.id,
          channelName: snippet.title,
          description: snippet.description,
          thumbnail: snippet.thumbnails.medium.url,
          publishedAt: snippet.publishedAt
        },
        statistics: {
          subscriberCount: parseInt(stats.subscriberCount),
          videoCount: parseInt(stats.videoCount),
          viewCount: parseInt(stats.viewCount)
        },
        latestVideos: [],
        engagement: { totalLikes: 0, totalComments: 0, totalViews: 0 }
      });
    }

    // Get detailed video statistics
    const videoStatsResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
    );

    const videoStats = videoStatsResponse.data.items.map(video => ({
      videoId: video.id,
      viewCount: parseInt(video.statistics.viewCount || 0),
      likeCount: parseInt(video.statistics.likeCount || 0),
      commentCount: parseInt(video.statistics.commentCount || 0)
    }));

    // Combine
    const videosWithStats = latestVideos.map(video => {
      const stats = videoStats.find(s => s.videoId === video.videoId);
      return { ...video, ...stats };
    });

    const response = {
      channelInfo: {
        youtubeChannelId: channel.id,
        channelName: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.medium.url,
        publishedAt: snippet.publishedAt
      },
      statistics: {
        subscriberCount: parseInt(stats.subscriberCount),
        videoCount: parseInt(stats.videoCount),
        viewCount: parseInt(stats.viewCount)
      },
      latestVideos: videosWithStats,
      engagement: {
        totalLikes: videosWithStats.reduce((sum, v) => sum + (v.likeCount || 0), 0),
        totalComments: videosWithStats.reduce((sum, v) => sum + (v.commentCount || 0), 0),
        totalViews: videosWithStats.reduce((sum, v) => sum + (v.viewCount || 0), 0)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to fetch YouTube data',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

// @desc    Search YouTube channels
// @route   GET /api/youtube/search
// @access  Private
const searchYouTubeChannels = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'YouTube API key not configured' });
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=10&key=${apiKey}`
    );

    const channels = response.data.items.map(item => ({
      youtubeChannelId: item.id.youtubeChannelId,
      channelName: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

    res.json({ channels });
  } catch (error) {
    console.error('YouTube search error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to search YouTube channels',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

module.exports = {
  getYouTubeStats,
  searchYouTubeChannels,
};
