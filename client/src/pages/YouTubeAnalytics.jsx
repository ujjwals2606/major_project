import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { youtubeAPI } from '../utils/api';
import { StatCard, ChartCard } from '../components/Card';
import { LineChart, AreaChart, BarChart, MultiLineChart } from '../components/Chart';
import { 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Youtube,
  Play,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const YouTubeAnalytics = () => {
  const [youtubeData, setYoutubeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchYouTubeData();
  }, [timeRange]);

  const fetchYouTubeData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockData = {
        channelInfo: {
          channelName: "Your YouTube Channel",
          description: "Creating amazing content for creators",
          subscriberCount: 125000,
          videoCount: 45,
          viewCount: 2500000,
          thumbnail: "https://via.placeholder.com/150"
        },
        latestVideos: [
          {
            videoId: "1",
            title: "How to Grow on YouTube in 2024",
            publishedAt: "2024-01-15T10:00:00Z",
            thumbnail: "https://via.placeholder.com/300x200",
            viewCount: 15000,
            likeCount: 1200,
            commentCount: 89
          },
          {
            videoId: "2", 
            title: "Content Creation Tips for Beginners",
            publishedAt: "2024-01-10T14:30:00Z",
            thumbnail: "https://via.placeholder.com/300x200",
            viewCount: 12000,
            likeCount: 980,
            commentCount: 67
          },
          {
            videoId: "3",
            title: "Analytics Deep Dive - Understanding Your Data",
            publishedAt: "2024-01-05T09:15:00Z", 
            thumbnail: "https://via.placeholder.com/300x200",
            viewCount: 8500,
            likeCount: 750,
            commentCount: 45
          }
        ],
        engagement: {
          totalLikes: 5000,
          totalComments: 300,
          totalViews: 100000
        }
      };

      setYoutubeData(mockData);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      toast.error('Failed to load YouTube analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Mock chart data
  const subscriberGrowthData = [
    { name: 'Jan', subscribers: 100000, views: 500000 },
    { name: 'Feb', subscribers: 105000, views: 600000 },
    { name: 'Mar', subscribers: 110000, views: 700000 },
    { name: 'Apr', subscribers: 115000, views: 800000 },
    { name: 'May', subscribers: 120000, views: 900000 },
    { name: 'Jun', subscribers: 125000, views: 1000000 },
  ];

  const videoPerformanceData = [
    { name: 'Video 1', views: 15000, likes: 1200, comments: 89 },
    { name: 'Video 2', views: 12000, likes: 980, comments: 67 },
    { name: 'Video 3', views: 8500, likes: 750, comments: 45 },
    { name: 'Video 4', views: 11000, likes: 890, comments: 56 },
    { name: 'Video 5', views: 9500, likes: 720, comments: 38 },
  ];

  const engagementTrendData = [
    { name: 'Week 1', likes: 1200, comments: 89, views: 15000 },
    { name: 'Week 2', likes: 980, comments: 67, views: 12000 },
    { name: 'Week 3', likes: 750, comments: 45, views: 8500 },
    { name: 'Week 4', likes: 890, comments: 56, views: 11000 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Analytics</h1>
          <p className="text-gray-600">Track your YouTube channel performance and growth</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </motion.div>

      {/* Channel Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card bg-gradient-to-r from-red-50 to-red-100 border-red-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <Youtube className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{youtubeData?.channelInfo?.channelName}</h2>
            <p className="text-gray-600">{youtubeData?.channelInfo?.description}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{formatNumber(youtubeData?.channelInfo?.subscriberCount || 0)}</p>
            <p className="text-gray-600">subscribers</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatCard
            title="Total Views"
            value={formatNumber(youtubeData?.channelInfo?.viewCount || 0)}
            icon={Eye}
            color="blue"
            change="+12% this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatCard
            title="Total Videos"
            value={youtubeData?.channelInfo?.videoCount || 0}
            icon={Play}
            color="green"
            change="+3 this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCard
            title="Total Likes"
            value={formatNumber(youtubeData?.engagement?.totalLikes || 0)}
            icon={Heart}
            color="purple"
            change="+18% this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <StatCard
            title="Total Comments"
            value={formatNumber(youtubeData?.engagement?.totalComments || 0)}
            icon={MessageCircle}
            color="orange"
            change="+8% this month"
          />
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChartCard title="Subscriber Growth">
            <LineChart 
              data={subscriberGrowthData} 
              dataKey="subscribers" 
              color="#dc2626"
            />
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ChartCard title="Video Performance">
            <BarChart 
              data={videoPerformanceData} 
              dataKey="views" 
              color="#dc2626"
            />
          </ChartCard>
        </motion.div>
      </div>

      {/* Engagement Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ChartCard title="Engagement Trends">
          <MultiLineChart 
            data={engagementTrendData}
            lines={[
              { dataKey: 'likes', color: '#dc2626' },
              { dataKey: 'comments', color: '#8b5cf6' },
              { dataKey: 'views', color: '#06b6d4' }
            ]}
          />
        </ChartCard>
      </motion.div>

      {/* Latest Videos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <ChartCard title="Latest Videos">
          <div className="space-y-4">
            {youtubeData?.latestVideos?.map((video, index) => (
              <motion.div
                key={video.videoId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h4>
                  <p className="text-sm text-gray-600">{formatDate(video.publishedAt)}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(video.viewCount)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{formatNumber(video.likeCount)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{video.commentCount}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </motion.div>
    </div>
  );
};

export default YouTubeAnalytics;
