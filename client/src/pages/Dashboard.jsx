import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { youtubeAPI, instagramAPI } from '../utils/api';
import { StatCard, ChartCard } from '../components/Card';
import { LineChart, AreaChart, BarChart } from '../components/Chart';
import { 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Youtube, 
  Instagram,
  Plus,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [youtubeData, setYoutubeData] = useState(null);
  const [instagramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration - in real app, you'd fetch from APIs
      const mockYoutubeData = {
        channelInfo: {
          channelName: "Your Channel",
          subscriberCount: 125000,
          videoCount: 45,
          viewCount: 2500000
        },
        latestVideos: [
          { title: "How to Grow on YouTube", views: 15000, likes: 1200, comments: 89 },
          { title: "Content Creation Tips", views: 12000, likes: 980, comments: 67 },
          { title: "Analytics Deep Dive", views: 8500, likes: 750, comments: 45 }
        ],
        engagement: {
          totalLikes: 5000,
          totalComments: 300,
          totalViews: 100000
        }
      };

      const mockInstagramData = {
        accountInfo: {
          username: "your_instagram",
          followersCount: 85000,
          mediaCount: 120
        },
        recentMedia: [
          { caption: "Behind the scenes", likeCount: 2500, commentCount: 150 },
          { caption: "New project announcement", likeCount: 3200, commentCount: 200 },
          { caption: "Daily inspiration", likeCount: 1800, commentCount: 95 }
        ],
        engagement: {
          totalLikes: 15000,
          totalComments: 800,
          engagementRate: 4.2
        }
      };

      setYoutubeData(mockYoutubeData);
      setInstagramData(mockInstagramData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
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

  const chartData = [
    { name: 'Jan', subscribers: 100000, views: 500000 },
    { name: 'Feb', subscribers: 105000, views: 600000 },
    { name: 'Mar', subscribers: 110000, views: 700000 },
    { name: 'Apr', subscribers: 115000, views: 800000 },
    { name: 'May', subscribers: 120000, views: 900000 },
    { name: 'Jun', subscribers: 125000, views: 1000000 },
  ];

  const engagementData = [
    { name: 'YouTube', likes: 5000, comments: 300, views: 100000 },
    { name: 'Instagram', likes: 15000, comments: 800, views: 50000 },
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
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your content across platforms.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatCard
            title="Total Subscribers"
            value={formatNumber((youtubeData?.channelInfo?.subscriberCount || 0) + (instagramData?.accountInfo?.followersCount || 0))}
            icon={Users}
            color="brand"
            change="+12% this month"
          />
        </motion.div>

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
            change="+8% this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatCard
            title="Total Likes"
            value={formatNumber((youtubeData?.engagement?.totalLikes || 0) + (instagramData?.engagement?.totalLikes || 0))}
            icon={Heart}
            color="green"
            change="+15% this month"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCard
            title="Engagement Rate"
            value={`${instagramData?.engagement?.engagementRate || 0}%`}
            icon={TrendingUp}
            color="purple"
            change="+2.1% this month"
          />
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ChartCard title="Growth Over Time">
            <LineChart 
              data={chartData} 
              dataKey="subscribers" 
              color="#6366f1"
            />
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChartCard title="Platform Comparison">
            <BarChart 
              data={engagementData} 
              dataKey="likes" 
              color="#8b5cf6"
            />
          </ChartCard>
        </motion.div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YouTube Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ChartCard 
            title="YouTube Analytics" 
            headerAction={
              <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">
                View Details
              </button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Youtube className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{youtubeData?.channelInfo?.channelName}</p>
                    <p className="text-sm text-gray-600">{formatNumber(youtubeData?.channelInfo?.subscriberCount || 0)} subscribers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(youtubeData?.channelInfo?.viewCount || 0)}</p>
                  <p className="text-sm text-gray-600">total views</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{youtubeData?.channelInfo?.videoCount || 0}</p>
                  <p className="text-sm text-gray-600">Videos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{formatNumber(youtubeData?.engagement?.totalLikes || 0)}</p>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{youtubeData?.engagement?.totalComments || 0}</p>
                  <p className="text-sm text-gray-600">Comments</p>
                </div>
              </div>
            </div>
          </ChartCard>
        </motion.div>

        {/* Instagram Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ChartCard 
            title="Instagram Analytics"
            headerAction={
              <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">
                View Details
              </button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">@{instagramData?.accountInfo?.username}</p>
                    <p className="text-sm text-gray-600">{formatNumber(instagramData?.accountInfo?.followersCount || 0)} followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{instagramData?.accountInfo?.mediaCount || 0}</p>
                  <p className="text-sm text-gray-600">posts</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{formatNumber(instagramData?.engagement?.totalLikes || 0)}</p>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{instagramData?.engagement?.totalComments || 0}</p>
                  <p className="text-sm text-gray-600">Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{instagramData?.engagement?.engagementRate || 0}%</p>
                  <p className="text-sm text-gray-600">Engagement</p>
                </div>
              </div>
            </div>
          </ChartCard>
        </motion.div>
      </div>

      {/* Connect Platforms */}
      {(!user?.youtubeConnected || !user?.instagramConnected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="card bg-gradient-to-r from-brand-50 to-purple-50 border-brand-200"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Connect Your Platforms
            </h3>
            <p className="text-gray-600 mb-4">
              Link your YouTube and Instagram accounts to start tracking your analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!user?.youtubeConnected && (
                <button className="btn-primary inline-flex items-center">
                  <Youtube className="w-4 h-4 mr-2" />
                  Connect YouTube
                </button>
              )}
              {!user?.instagramConnected && (
                <button className="btn-primary inline-flex items-center">
                  <Instagram className="w-4 h-4 mr-2" />
                  Connect Instagram
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
