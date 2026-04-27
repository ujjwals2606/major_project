import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { instagramAPI } from "../utils/api";
import { StatCard, ChartCard } from "../components/Card";
import {
  LineChart,
  AreaChart,
  BarChart,
  MultiLineChart,
} from "../components/Chart";
import {
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Instagram,
  Image as ImageIcon,
  Hash,
  Eye,
  Calendar,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Activity,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const InstagramAnalytics = () => {
  const [instagramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchInstagramData();
  }, [timeRange]);

  const fetchInstagramData = async () => {
    try {
      setLoading(true);

      const mockData = {
        accountInfo: {
          accountId: "123456789",
          username: "your_instagram",
          accountType: "BUSINESS",
          followersCount: 85000,
          followsCount: 1200,
          mediaCount: 120,
        },
        recentMedia: [
          {
            id: "1",
            caption:
              "Behind the scenes of our latest project! 🎬 #behindthescenes #contentcreation",
            mediaType: "IMAGE",
            mediaUrl: "https://via.placeholder.com/400x400",
            permalink: "https://instagram.com/p/example1",
            timestamp: "2024-01-15T10:00:00Z",
            likeCount: 2500,
            commentCount: 150,
          },
          {
            id: "2",
            caption:
              "New project announcement! Excited to share this with you all 🚀 #newproject #excited",
            mediaType: "CAROUSEL_ALBUM",
            mediaUrl: "https://via.placeholder.com/400x400",
            permalink: "https://instagram.com/p/example2",
            timestamp: "2024-01-10T14:30:00Z",
            likeCount: 3200,
            commentCount: 200,
          },
          {
            id: "3",
            caption:
              "Daily inspiration for creators 💡 #inspiration #creators #motivation",
            mediaType: "IMAGE",
            mediaUrl: "https://via.placeholder.com/400x400",
            permalink: "https://instagram.com/p/example3",
            timestamp: "2024-01-05T09:15:00Z",
            likeCount: 1800,
            commentCount: 95,
          },
        ],
        engagement: {
          totalLikes: 15000,
          totalComments: 800,
          totalEngagement: 15800,
          engagementRate: 4.2,
        },
      };

      setInstagramData(mockData);
    } catch (error) {
      console.error("Error fetching Instagram data:", error);
      toast.error("Failed to load Instagram analytics");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const followerGrowthData = [
    { name: "Jan", followers: 80000, engagement: 3.2 },
    { name: "Feb", followers: 82000, engagement: 3.5 },
    { name: "Mar", followers: 84000, engagement: 3.8 },
    { name: "Apr", followers: 85000, engagement: 4.0 },
    { name: "May", followers: 86000, engagement: 4.1 },
    { name: "Jun", followers: 85000, engagement: 4.2 },
  ];

  const postPerformanceData = [
    { name: "Post 1", likes: 2500, comments: 150, reach: 12000 },
    { name: "Post 2", likes: 3200, comments: 200, reach: 15000 },
    { name: "Post 3", likes: 1800, comments: 95, reach: 9000 },
    { name: "Post 4", likes: 2100, comments: 120, reach: 11000 },
    { name: "Post 5", likes: 2800, comments: 180, reach: 13000 },
  ];

  const engagementTrendData = [
    { name: "Week 1", likes: 2500, comments: 150, reach: 12000 },
    { name: "Week 2", likes: 3200, comments: 200, reach: 15000 },
    { name: "Week 3", likes: 1800, comments: 95, reach: 9000 },
    { name: "Week 4", likes: 2100, comments: 120, reach: 11000 },
  ];

  const hashtags = [
    { hashtag: "#contentcreation", posts: 15, reach: 45000 },
    { hashtag: "#behindthescenes", posts: 12, reach: 38000 },
    { hashtag: "#inspiration", posts: 10, reach: 32000 },
    { hashtag: "#creators", posts: 8, reach: 28000 },
    { hashtag: "#motivation", posts: 6, reach: 22000 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white animate-spin" />
          <p className="text-sm text-neutral-500">Loading Instagram analytics…</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Followers",
      value: formatNumber(instagramData?.accountInfo?.followersCount),
      change: "+3.4%",
      icon: Users,
      tint: "from-pink-500/15 to-pink-500/0 text-pink-600 dark:text-pink-400",
    },
    {
      label: "Total Likes",
      value: formatNumber(instagramData?.engagement?.totalLikes),
      change: "+8.1%",
      icon: Heart,
      tint: "from-rose-500/15 to-rose-500/0 text-rose-600 dark:text-rose-400",
    },
    {
      label: "Comments",
      value: formatNumber(instagramData?.engagement?.totalComments),
      change: "+5.2%",
      icon: MessageCircle,
      tint: "from-indigo-500/15 to-indigo-500/0 text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Engagement Rate",
      value: `${instagramData?.engagement?.engagementRate}%`,
      change: "+0.6%",
      icon: TrendingUp,
      tint: "from-amber-500/15 to-amber-500/0 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-3">
              <Instagram className="h-3.5 w-3.5 text-pink-500" />
              Instagram
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Instagram Analytics
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Track your account performance and engagement in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2.5 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Account Overview Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 dark:from-neutral-900 dark:to-black p-6 sm:p-7 shadow-sm"
        >
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Instagram className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  @{instagramData?.accountInfo?.username}
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Connected
                </span>
              </div>
              <p className="mt-1 text-sm text-white/60 capitalize">
                {instagramData?.accountInfo?.accountType?.toLowerCase()} account
                · {instagramData?.accountInfo?.mediaCount} posts
              </p>
            </div>

            <div className="flex sm:flex-col sm:items-end gap-4 sm:gap-1">
              <div>
                <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                  {formatNumber(instagramData?.accountInfo?.followersCount)}
                </p>
                <p className="text-xs text-white/60 uppercase tracking-wide">
                  Followers
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Key Metrics
              </h2>
              <p className="text-sm text-neutral-500">
                Performance snapshot for the selected period
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.tint} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      {s.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                      {s.value}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="h-3 w-3" />
                      {s.change} this month
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${s.tint}`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Follower Growth
                </p>
                <p className="text-xs text-neutral-500">Last 6 months</p>
              </div>
              <Activity className="h-4 w-4 text-neutral-400" />
            </div>
            <ChartCard>
              <AreaChart data={followerGrowthData} dataKey="followers" />
            </ChartCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Post Performance
                </p>
                <p className="text-xs text-neutral-500">Recent 5 posts</p>
              </div>
              <BarChart3 className="h-4 w-4 text-neutral-400" />
            </div>
            <ChartCard>
              <BarChart data={postPerformanceData} dataKey="likes" />
            </ChartCard>
          </motion.div>
        </section>

        {/* Engagement Trends */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                Engagement Trends
              </p>
              <p className="text-xs text-neutral-500">
                Likes, comments and reach over the last 4 weeks
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-medium">
              Weekly
            </span>
          </div>
          <ChartCard>
            <MultiLineChart
              data={engagementTrendData}
              dataKeys={["likes", "comments", "reach"]}
            />
          </ChartCard>
        </motion.section>

        {/* Recent Posts */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Recent Posts
              </h2>
              <p className="text-sm text-neutral-500">
                Your latest content and how it's performing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {instagramData?.recentMedia?.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <img
                    src={post.mediaUrl}
                    alt={post.caption?.slice(0, 60)}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white">
                    <ImageIcon className="h-3 w-3" />
                    {post.mediaType === "CAROUSEL_ALBUM" ? "Carousel" : "Image"}
                  </span>
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/90 text-neutral-900 opacity-0 group-hover:opacity-100 transition">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {formatDate(post.timestamp)}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-rose-500" />
                        {formatNumber(post.likeCount)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5 text-indigo-500" />
                        {post.commentCount}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Hashtag Performance */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-pink-500" />
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Hashtag Performance
                </h3>
              </div>
              <p className="text-sm text-neutral-500 mt-0.5">
                Top performing hashtags from your recent posts
              </p>
            </div>
            <button className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition">
              View all <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {hashtags.map((item, index) => (
              <motion.li
                key={item.hashtag}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-pink-500/15 to-orange-400/10 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-white truncate">
                      {item.hashtag}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {item.posts} posts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {formatNumber(item.reach)}
                    </p>
                    <p className="text-xs text-neutral-500">reach</p>
                  </div>
                  <div className="hidden sm:block w-28">
                    <div className="h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400"
                        style={{
                          width: `${Math.min(
                            100,
                            (item.reach / 45000) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
};

export default InstagramAnalytics;
