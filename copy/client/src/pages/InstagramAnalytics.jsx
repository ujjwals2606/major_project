import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { instagramAPI } from '../utils/api';
import { StatCard, ChartCard } from '../components/Card';
import { LineChart, AreaChart, BarChart, MultiLineChart } from '../components/Chart';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Instagram,
  Image,
  Hash,
  Eye
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const InstagramAnalytics = () => {
  const [instagramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchInstagramData();
  }, [timeRange]);

  const fetchInstagramData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockData = {
        accountInfo: {
          accountId: "123456789",
          username: "your_instagram",
          accountType: "BUSINESS",
          followersCount: 85000,
          followsCount: 1200,
          mediaCount: 120
        },
        recentMedia: [
          {
            id: "1",
            caption: "Behind the scenes of our latest project! 🎬 #behindthescenes #contentcreation",
            mediaType: "IMAGE",
            mediaUrl: "https://via.placeholder.com/400x400",
            permalink: "https://instagram.com/p/example1",
            timestamp: "2024-01-15T10:00:00Z",
            likeCount: 2500,
            commentCount: 150
          },
          {
            id: "2",
            caption: "New project announcement! Excited to share this with you all 🚀 #newproject #excited",
            mediaType: "CAROUSEL_ALBUM",
            mediaUrl: "https://via.placeholder.com/400x400",
            permalink: "https://instagram.com/p/example2",
            timestamp: "2024-01-10T14:30:00Z",
            likeCount: 3200,
            commentCount: 200
          },
          {
            id: "3",
            caption: "Daily inspiration for creators 💡 #inspiration #creators #motivation",
            mediaType: "IMAGE",
            mediaUrl: "https://via.placeholder.com/400x400",
            permalink: "https://instagram.com/p/example3",
            timestamp: "2024-01-05T09:15:00Z",
            likeCount: 1800,
            commentCount: 95
          }
        ],
        engagement: {
          totalLikes: 15000,
          totalComments: 800,
          totalEngagement: 15800,
          engagementRate: 4.2
        }
      };

      setInstagramData(mockData);
    } catch (error) {
      console.error('Error fetching Instagram data:', error);
      toast.error('Failed to load Instagram analytics');
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
  const followerGrowthData = [
    { name: 'Jan', followers: 80000, engagement: 3.2 },
    { name: 'Feb', followers: 82000, engagement: 3.5 },
    { name: 'Mar', followers: 84000, engagement: 3.8 },
    { name: 'Apr', followers: 85000, engagement: 4.0 },
    { name: 'May', followers: 86000, engagement: 4.1 },
    { name: 'Jun', followers: 85000, engagement: 4.2 },
  ];

  const postPerformanceData = [
    { name: 'Post 1', likes: 2500, comments: 150, reach: 12000 },
    { name: 'Post 2', likes: 3200, comments: 200, reach: 15000 },
    { name: 'Post 3', likes: 1800, comments: 95, reach: 9000 },
    { name: 'Post 4', likes: 2100, comments: 120, reach: 11000 },
    { name: 'Post 5', likes: 2800, comments: 180, reach: 13000 },
  ];

  const engagementTrendData = [
    { name: 'Week 1', likes: 2500, comments: 150, reach: 12000 },
    { name: 'Week 2', likes: 3200, comments: 200, reach: 15000 },
    { name: 'Week 3', likes: 1800, comments: 95, reach: 9000 },
    { name: 'Week 4', likes: 2100, comments: 120, reach: 11000 },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instagram Analytics</h1>
          <p className="text-gray-600">Track your Instagram account performance and engagement</p>
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

      {/* Account Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">@{instagramData?.accountInfo?.username}</h2>
            <p className="text-gray-600 capitalize">{instagramData?.accountInfo?.accountType?.toLowerCase()} Account</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{formatNumber(instagramData?.accountInfo?.followersCount || 0)}</p>
            <p className="text-gray-600">followers</p>
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
            title="Total Posts"
            value={instagramData?.accountInfo?.mediaCount || 0}
            icon={Image}
            color="pink"
            change="+5 this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatCard
            title="Total Likes"
            value={formatNumber(instagramData?.engagement?.totalLikes || 0)}
            icon={Heart}
            color="red"
            change="+22% this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCard
            title="Total Comments"
            value={formatNumber(instagramData?.engagement?.totalComments || 0)}
            icon={MessageCircle}
            color="blue"
            change="+15% this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <StatCard
            title="Engagement Rate"
            value={`${instagramData?.engagement?.engagementRate || 0}%`}
            icon={TrendingUp}
            color="green"
            change="+0.3% this month"
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
          <ChartCard title="Follower Growth">
            <LineChart 
              data={followerGrowthData} 
              dataKey="followers" 
              color="#ec4899"
            />
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ChartCard title="Post Performance">
            <BarChart 
              data={postPerformanceData} 
              dataKey="likes" 
              color="#8b5cf6"
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
              { dataKey: 'likes', color: '#ec4899' },
              { dataKey: 'comments', color: '#8b5cf6' },
              { dataKey: 'reach', color: '#06b6d4' }
            ]}
          />
        </ChartCard>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <ChartCard title="Recent Posts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instagramData?.recentMedia?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-200 relative">
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {post.mediaType === 'CAROUSEL_ALBUM' ? 'Carousel' : 'Image'}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {post.caption}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(post.timestamp)}</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{formatNumber(post.likeCount)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </motion.div>

      {/* Hashtag Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <ChartCard title="Top Hashtags">
          <div className="space-y-3">
            {[
              { hashtag: '#contentcreation', posts: 15, reach: 45000 },
              { hashtag: '#behindthescenes', posts: 12, reach: 38000 },
              { hashtag: '#inspiration', posts: 10, reach: 32000 },
              { hashtag: '#creators', posts: 8, reach: 28000 },
              { hashtag: '#motivation', posts: 6, reach: 22000 },
            ].map((item, index) => (
              <motion.div
                key={item.hashtag}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{item.hashtag}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{item.posts} posts</span>
                  <span>{formatNumber(item.reach)} reach</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </motion.div>
    </div>
  );
};

export default InstagramAnalytics;
