import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { StatCard, ChartCard } from "../components/Card";
import {
  Users,
  Eye,
  Heart,
  TrendingUp,
  Youtube,
  Instagram,
  Sparkles,
  BarChart3,
  Zap,
  ArrowUpRight,
  Plus,
  Activity,
  Link2,
  Bell,
  Calendar,
  Rocket,
  Target,
  PieChart,
} from "lucide-react";
import { toast } from "react-hot-toast";

const CLIENT_ID =
  "878235149923-mdl596ntipcc5r0cv0h4eo0bd5nrhphn.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000/auth/youtube/callback";
const YOUTUBE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly&include_granted_scopes=true`;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Dashboard = () => {
  const { user } = useAuth();

  const [youtubeData, setYoutubeData] = useState(null);
  const [instagramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectYouTube = () => {
    window.location.href = YOUTUBE_AUTH_URL;
  };

  useEffect(() => {
    fetchYoutubeData();
  }, []);

  const fetchYoutubeData = async () => {
    try {
      const token = localStorage.getItem("youtube_token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!data.items || data.items.length === 0) {
        throw new Error("No YouTube channel found");
      }

      const channel = data.items[0];

      setYoutubeData({
        channelInfo: {
          channelName: channel.snippet.title,
          subscriberCount: channel.statistics.subscriberCount,
          videoCount: channel.statistics.videoCount,
          viewCount: channel.statistics.viewCount,
        },
        engagement: {
          totalLikes: 0,
          totalComments: 0,
        },
      });

      setInstagramData({
        accountInfo: {
          username: "your_instagram",
          followersCount: 85000,
        },
        engagement: {
          engagementRate: 4.2,
        },
      });
    } catch (error) {
      console.error("YouTube API Error:", error);
      toast.error("Failed to load YouTube data");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    const number = parseInt(num);
    if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    if (number >= 1000) return (number / 1000).toFixed(1) + "K";
    return number.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white animate-spin" />
          <p className="text-sm text-neutral-500">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Subscribers",
      value: youtubeData
        ? formatNumber(youtubeData.channelInfo.subscriberCount)
        : "—",
      change: "+12.4%",
      icon: Users,
      tint: "from-indigo-500/15 to-indigo-500/0 text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Total Views",
      value: youtubeData
        ? formatNumber(youtubeData.channelInfo.viewCount)
        : "—",
      change: "+8.1%",
      icon: Eye,
      tint: "from-emerald-500/15 to-emerald-500/0 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Engagement Rate",
      value: instagramData
        ? `${instagramData.engagement.engagementRate}%`
        : "—",
      change: "+2.3%",
      icon: Heart,
      tint: "from-rose-500/15 to-rose-500/0 text-rose-600 dark:text-rose-400",
    },
    {
      label: "Growth Score",
      value: "87",
      change: "+5.0%",
      icon: TrendingUp,
      tint: "from-amber-500/15 to-amber-500/0 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Welcome Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 dark:from-neutral-900 dark:to-black p-6 sm:p-8 shadow-sm"
        >
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium text-white/80 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Creator Mitra
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                Welcome back, {user?.name || "Creator"} 👋
              </h1>
              <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
                Here's a snapshot of your content performance and how your
                audience is growing today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 transition px-4 py-2.5 text-sm font-medium text-white border border-white/10">
                <Calendar className="h-4 w-4" />
                Last 30 days
              </button>
              <button
                onClick={connectYouTube}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 transition px-4 py-2.5 text-sm font-semibold shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Connect Account
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats / Performance Overview */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Performance Overview
              </h2>
              <p className="text-sm text-neutral-500">
                Key metrics across all your connected platforms
              </p>
            </div>
            <button className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition">
              View report <ArrowUpRight className="h-4 w-4" />
            </button>
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

        {/* Connected Platforms */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Connected Platforms
              </h2>
              <p className="text-sm text-neutral-500">
                Manage and monitor your social channels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* YouTube */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:shadow-md transition-all"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-red-500/10 blur-3xl rounded-full" />
              {youtubeData ? (
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <Youtube className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          {youtubeData.channelInfo.channelName}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {formatNumber(
                            youtubeData.channelInfo.subscriberCount
                          )}{" "}
                          subscribers
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3">
                      <p className="text-xs text-neutral-500">Views</p>
                      <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                        {formatNumber(youtubeData.channelInfo.viewCount)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3">
                      <p className="text-xs text-neutral-500">Videos</p>
                      <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                        {formatNumber(youtubeData.channelInfo.videoCount)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3">
                      <p className="text-xs text-neutral-500">Subs</p>
                      <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                        {formatNumber(
                          youtubeData.channelInfo.subscriberCount
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col items-center text-center py-6">
                  <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                    <Youtube className="h-7 w-7 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    Connect YouTube
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 max-w-xs">
                    Sync your channel to track subscribers, views and growth.
                  </p>
                  <button
                    onClick={connectYouTube}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2.5 text-sm font-medium hover:opacity-90 transition"
                  >
                    <Link2 className="h-4 w-4" />
                    Connect YouTube
                  </button>
                </div>
              )}
            </motion.div>

            {/* Instagram */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:shadow-md transition-all"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-pink-500/10 blur-3xl rounded-full" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      @{instagramData?.accountInfo?.username || "instagram"}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {formatNumber(
                        instagramData?.accountInfo?.followersCount
                      )}{" "}
                      followers
                    </p>
                  </div>
                </div>
                {instagramData ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Connected
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500">Not linked</span>
                )}
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3">
                  <p className="text-xs text-neutral-500">Engagement</p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                    {instagramData?.engagement?.engagementRate ?? "—"}%
                  </p>
                </div>
                <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3">
                  <p className="text-xs text-neutral-500">Followers</p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                    {formatNumber(
                      instagramData?.accountInfo?.followersCount
                    )}
                  </p>
                </div>
                <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-3">
                  <p className="text-xs text-neutral-500">Reach</p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                    —
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions + Growth Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Quick Actions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-amber-500" />
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                Quick Actions
              </h3>
            </div>
            <p className="text-sm text-neutral-500">
              Jump back into your workflow
            </p>

            <div className="mt-5 space-y-2.5">
              {[
                { icon: Plus, label: "Create new post", desc: "Schedule content" },
                { icon: BarChart3, label: "View analytics", desc: "Deep insights" },
                { icon: Bell, label: "Notifications", desc: "3 unread" },
                { icon: Link2, label: "Connect platform", desc: "Add new account" },
              ].map((a) => (
                <button
                  key={a.label}
                  className="w-full group flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm transition px-3.5 py-3 text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                    <a.icon className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {a.label}
                    </p>
                    <p className="text-xs text-neutral-500">{a.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Growth Insights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Rocket className="h-4 w-4 text-indigo-500" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    Growth Insights
                  </h3>
                </div>
                <p className="text-sm text-neutral-500">
                  AI-powered recommendations to grow faster
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                Beta
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Target,
                  title: "Best time to post",
                  value: "7:30 PM IST",
                  hint: "Based on last 30 days",
                  color: "text-indigo-500 bg-indigo-500/10",
                },
                {
                  icon: Activity,
                  title: "Audience momentum",
                  value: "+18% this week",
                  hint: "Subscribers trending up",
                  color: "text-emerald-500 bg-emerald-500/10",
                },
                {
                  icon: PieChart,
                  title: "Top content type",
                  value: "Short-form video",
                  hint: "2.4× higher engagement",
                  color: "text-rose-500 bg-rose-500/10",
                },
                {
                  icon: Sparkles,
                  title: "Suggested topic",
                  value: "Behind-the-scenes",
                  hint: "Trending in your niche",
                  color: "text-amber-500 bg-amber-500/10",
                },
              ].map((it) => (
                <div
                  key={it.title}
                  className="group rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm transition"
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center ${it.color}`}
                  >
                    <it.icon className="h-4.5 w-4.5" />
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
                    {it.title}
                  </p>
                  <p className="mt-1 text-base font-semibold text-neutral-900 dark:text-white">
                    {it.value}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">{it.hint}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Empty state — Connect Platforms */}
        {!youtubeData && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 p-8 sm:p-10 text-center"
          >
            <div className="mx-auto h-14 w-14 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center mb-4">
              <Link2 className="h-7 w-7 text-white dark:text-neutral-900" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Connect Your Platforms
            </h3>
            <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
              Link your YouTube and Instagram accounts to unlock real-time
              analytics, growth insights and personalized recommendations.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={connectYouTube}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
              >
                <Youtube className="h-4 w-4" />
                Connect YouTube
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white px-5 py-2.5 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                <Instagram className="h-4 w-4" />
                Connect Instagram
              </button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
