import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard, ChartCard } from "../components/Card";
import { LineChart } from "../components/Chart";
import {
  Users,
  Eye,
  MessageCircle,
  Play,
  ThumbsUp,
  DollarSign,
  Youtube,
  Upload,
  X,
  Filter,
  TrendingUp,
  Clock,
  Video,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Search,
} from "lucide-react";
import { toast } from "react-hot-toast";

const YouTubeAnalytics = () => {
  // ================= STATE =================
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const [chartData, setChartData] = useState([]);
  const [subscriberGrowth, setSubscriberGrowth] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [postPerformance, setPostPerformance] = useState([]);

  const [activeTab, setActiveTab] = useState("channel");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoChart, setVideoChart] = useState([]);

  const [filter, setFilter] = useState("newest");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 UPLOAD STATE
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // ================= EFFECT =================
  useEffect(() => {
    fetchYouTubeData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [videos, filter, search]);

  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "auto";
  }, [selectedVideo]);

  // ================= FILTER =================
  const applyFilter = () => {
    let sorted = [...videos];

    if (search.trim()) {
      sorted = sorted.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "newest") {
      sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (filter === "oldest") {
      sorted.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (filter === "popular") {
      sorted.sort((a, b) => b.views - a.views);
    } else if (filter === "engaging") {
      sorted.sort(
        (a, b) => b.likes + b.comments * 5 - (a.likes + a.comments * 5)
      );
    }

    setFilteredVideos(sorted);
  };

  // ================= FETCH =================
  const fetchYouTubeData = async () => {
    try {
      const token = localStorage.getItem("youtube_token");
      if (!token) {
        toast.error("YouTube not connected");
        setLoading(false);
        return;
      }

      const channelRes = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const channelJson = await channelRes.json();
      const channel = channelJson.items[0];
      const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
      const subs = Number(channel.statistics.subscriberCount);

      setChannelData({
        name: channel.snippet.title,
        description: channel.snippet.description,
        subscribers: subs,
        views: channel.statistics.viewCount,
        videos: channel.statistics.videoCount,
        thumbnail: channel.snippet.thumbnails.high.url,
      });

      let allVideos = [];
      let nextPageToken = "";

      do {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        allVideos = [...allVideos, ...data.items];
        nextPageToken = data.nextPageToken;
      } while (nextPageToken);

      const videoIds = allVideos
        .map((v) => v.snippet.resourceId.videoId)
        .join(",");

      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const statsJson = await statsRes.json();

      const videoList = allVideos.map((v, index) => {
        const stats = statsJson.items[index]?.statistics;
        return {
          id: v.snippet.resourceId.videoId,
          title: v.snippet.title,
          thumbnail: v.snippet.thumbnails.medium.url,
          publishedAt: v.snippet.publishedAt,
          views: Number(stats?.viewCount || 0),
          likes: Number(stats?.likeCount || 0),
          comments: Number(stats?.commentCount || 0),
          watchTime: Number(stats?.viewCount || 0) * 3,
          subscribersGained: Math.floor((stats?.viewCount || 0) * 0.02),
          monetization: Math.floor((stats?.viewCount || 0) * 0.01),
        };
      });

      setVideos(videoList);

      setSubscriberGrowth(
        Array.from({ length: 7 }).map((_, i) => ({
          name: `Day ${i + 1}`,
          subscribers: Math.floor(subs * (0.85 + i * 0.025)),
        }))
      );

      setChartData(
        videoList.slice(0, 5).map((v, i) => ({
          name: `Video ${i + 1}`,
          views: v.views,
          overall: v.views + v.likes * 10 + v.comments * 20,
          watchTime: v.views * 3,
        }))
      );

      setEngagementData(videoList.slice(0, 7));
      setPostPerformance(videoList.slice(0, 5));
    } catch {
      toast.error("Failed to load YouTube analytics");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) return toast.error("Select a video");

    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulated progress
      const progressInterval = setInterval(() => {
        setUploadProgress((p) => (p < 90 ? p + 5 : p));
      }, 300);

      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);

      await fetch("http://localhost:5000/api/youtube/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("youtube_token")}`,
        },
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success("Uploaded 🚀");
      setTimeout(() => {
        setActiveTab("videos");
        setFile(null);
        setTitle("");
        setDescription("");
        setUploadProgress(0);
        fetchYouTubeData();
      }, 800);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error("File size must be under 100MB");
      return;
    }
    setFile(selectedFile);
  };

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const tabs = [
    { id: "channel", label: "Overview", icon: TrendingUp },
    { id: "videos", label: "Videos", icon: Video },
    { id: "upload", label: "Upload", icon: Upload },
  ];

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Youtube className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-2xl border-2 border-red-500/30 border-t-red-500 animate-spin" />
          </div>
          <p className="text-sm text-neutral-500 font-medium">
            Loading YouTube analytics…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ================= TOP BAR ================= */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-red-500/20 flex-shrink-0">
                <Youtube className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base font-semibold tracking-tight text-neutral-900 truncate">
                  YouTube Analytics
                </h1>
                <p className="text-xs text-neutral-500 truncate hidden sm:block">
                  {channelData?.name || "Your channel"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("upload")}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-3 sm:px-4 py-2 text-sm font-semibold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transition"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 -mb-px overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative inline-flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition ${
                    active
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  {active && (
                    <motion.span
                      layoutId="ytTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-rose-600 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* ============ CHANNEL ============ */}
          {activeTab === "channel" && (
            <motion.div
              key="channel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Channel hero */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white p-6 sm:p-8">
                <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-red-500/30 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={channelData?.thumbnail}
                      alt={channelData?.name}
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover ring-2 ring-white/20 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-red-500 ring-2 ring-neutral-900 flex items-center justify-center">
                      <Youtube className="h-3 w-3 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80 mb-2">
                      <Sparkles className="h-3 w-3 text-red-300" />
                      Live channel data
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {channelData?.name}
                    </h2>
                    <p className="mt-1.5 text-sm text-white/60 line-clamp-2 max-w-2xl">
                      {channelData?.description ||
                        "No channel description available."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs">
                        <Users className="h-3.5 w-3.5 text-red-300" />
                        <span className="font-semibold">
                          {formatNumber(channelData?.subscribers)}
                        </span>
                        <span className="text-white/60">subscribers</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs">
                        <Video className="h-3.5 w-3.5 text-rose-300" />
                        <span className="font-semibold">
                          {channelData?.videos}
                        </span>
                        <span className="text-white/60">videos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Subscribers",
                    value: formatNumber(channelData?.subscribers),
                    icon: Users,
                    change: "+12.4%",
                    color: "from-red-500 to-rose-600",
                  },
                  {
                    label: "Total Views",
                    value: formatNumber(channelData?.views),
                    icon: Eye,
                    change: "+8.2%",
                    color: "from-blue-500 to-indigo-600",
                  },
                  {
                    label: "Videos",
                    value: channelData?.videos,
                    icon: Play,
                    change: "+3",
                    color: "from-violet-500 to-purple-600",
                  },
                  {
                    label: "Est. Revenue",
                    value:
                      "$" +
                      formatNumber(
                        Math.floor(Number(channelData?.views) * 0.002)
                      ),
                    icon: DollarSign,
                    change: "+15.7%",
                    color: "from-emerald-500 to-green-600",
                  },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl bg-white border border-neutral-200 p-5 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.12)] transition"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-semibold">
                          <ArrowUpRight className="h-3 w-3" />
                          {s.change}
                        </span>
                      </div>
                      <p className="mt-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {s.label}
                      </p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
                        {s.value}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-neutral-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Subscriber Growth
                      </h3>
                      <p className="text-xs text-neutral-500">Last 7 days</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-700 px-2 py-0.5 text-xs font-semibold">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  </div>
                  <div className="h-64">
                    <LineChart
                      data={subscriberGrowth}
                      lines={[{ key: "subscribers", color: "#ef4444" }]}
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-neutral-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Top Video Performance
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Views, watch time & engagement
                      </p>
                    </div>
                  </div>
                  <div className="h-64">
                    <LineChart
                      data={chartData}
                      lines={[
                        { key: "views", color: "#0ea5e9" },
                        { key: "watchTime", color: "#22c55e" },
                        { key: "overall", color: "#a855f7" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Recent videos */}
              <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Recent uploads
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Latest performance snapshot
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("videos")}
                    className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1"
                  >
                    View all <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="divide-y divide-neutral-100">
                  {videos.slice(0, 5).map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVideo(v)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-neutral-50 transition text-left"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={v.thumbnail}
                          alt={v.title}
                          className="h-16 w-28 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 rounded-lg bg-black/0 hover:bg-black/40 transition flex items-center justify-center opacity-0 hover:opacity-100">
                          <Play className="h-5 w-5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 line-clamp-1">
                          {v.title}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {formatDate(v.publishedAt)}
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-600">
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {formatNumber(v.views)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {formatNumber(v.likes)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {formatNumber(v.comments)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============ VIDEOS ============ */}
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search videos…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  <Filter className="h-4 w-4 text-neutral-500 flex-shrink-0" />
                  {[
                    { id: "newest", label: "Newest" },
                    { id: "oldest", label: "Oldest" },
                    { id: "popular", label: "Most viewed" },
                    { id: "engaging", label: "Most engaging" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        filter === f.id
                          ? "bg-neutral-900 text-white"
                          : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              {filteredVideos.length === 0 ? (
                <div className="rounded-2xl bg-white border border-neutral-200 p-12 text-center">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                    <Video className="h-6 w-6 text-neutral-400" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">
                    No videos found
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Try a different search or filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVideos.map((v, i) => (
                    <motion.button
                      key={v.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.4) }}
                      onClick={() => setSelectedVideo(v)}
                      className="group text-left rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden bg-neutral-100">
                        <img
                          src={v.thumbnail}
                          alt={v.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 backdrop-blur px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {formatNumber(v.views)} views
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug">
                          {v.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1.5">
                          {formatDate(v.publishedAt)}
                        </p>
                        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                          <span className="inline-flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {formatNumber(v.likes)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {formatNumber(v.comments)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                            <TrendingUp className="h-3.5 w-3.5" />
                            +{formatNumber(v.subscribersGained)}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ============ UPLOAD ============ */}
          {activeTab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-red-500/20">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                        Upload a new video
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Max 100MB · MP4, MOV, AVI supported
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  {/* Dropzone */}
                  <div
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      handleFileSelect(e.dataTransfer.files?.[0]);
                    }}
                    className={`relative rounded-2xl border-2 border-dashed transition-all ${
                      dragActive
                        ? "border-red-500 bg-red-50"
                        : file
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-neutral-300 bg-neutral-50 hover:border-neutral-400"
                    } p-8 text-center`}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {file ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-neutral-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                        >
                          <X className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                          <FileVideo className="h-6 w-6 text-neutral-500" />
                        </div>
                        <p className="text-sm font-semibold text-neutral-900">
                          Drop your video here
                        </p>
                        <p className="text-xs text-neutral-500">
                          or{" "}
                          <span className="text-red-600 font-semibold">
                            click to browse
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="An engaging title for your video"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/60 focus:bg-white focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition"
                    />
                    <p className="mt-1 text-xs text-neutral-400 text-right">
                      {title.length}/100
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      placeholder="Tell viewers about your video…"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      maxLength={5000}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/60 focus:bg-white focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition resize-none"
                    />
                    <p className="mt-1 text-xs text-neutral-400 text-right">
                      {description.length}/5000
                    </p>
                  </div>

                  {/* Progress */}
                  {uploading && (
                    <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-neutral-700">
                          Uploading…
                        </span>
                        <span className="text-xs font-bold text-neutral-900">
                          {uploadProgress}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 to-rose-600"
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Notice */}
                  <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3">
                    <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      Your video will be uploaded directly to your connected
                      YouTube channel.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !file || !title}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(220,38,38,0.5)] transition ${
                      uploading || !file || !title
                        ? "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
                    }`}
                  >
                    {uploading ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Uploading…
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload to YouTube
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= VIDEO MODAL ================= */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-3xl rounded-2xl bg-white overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                <div className="relative aspect-video bg-black flex-shrink-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 backdrop-blur hover:bg-black/80 text-white flex items-center justify-center transition z-10"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-5 overflow-y-auto">
                  <h3 className="text-base font-semibold text-neutral-900 line-clamp-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {formatDate(selectedVideo.publishedAt)}
                  </p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      {
                        icon: Eye,
                        label: "Views",
                        value: formatNumber(selectedVideo.views),
                        color: "text-blue-600",
                      },
                      {
                        icon: ThumbsUp,
                        label: "Likes",
                        value: formatNumber(selectedVideo.likes),
                        color: "text-emerald-600",
                      },
                      {
                        icon: MessageCircle,
                        label: "Comments",
                        value: formatNumber(selectedVideo.comments),
                        color: "text-rose-600",
                      },
                      {
                        icon: TrendingUp,
                        label: "Subs gained",
                        value: "+" + formatNumber(selectedVideo.subscribersGained),
                        color: "text-violet-600",
                      },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.label}
                          className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3"
                        >
                          <Icon className={`h-4 w-4 ${s.color}`} />
                          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                            {s.label}
                          </p>
                          <p className="text-sm font-bold text-neutral-900">
                            {s.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YouTubeAnalytics;
