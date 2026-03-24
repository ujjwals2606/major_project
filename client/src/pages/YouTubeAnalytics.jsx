import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StatCard, ChartCard } from "../components/Card";
import { BarChart } from "../components/Chart";
import {
  Users,
  Eye,
  MessageCircle,
  TrendingUp,
  Youtube,
  Play,
  ThumbsUp
} from "lucide-react";
import { toast } from "react-hot-toast";

const YouTubeAnalytics = () => {

  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYouTubeData();
  }, []);

  const fetchYouTubeData = async () => {

    try {

      const token = localStorage.getItem("youtube_token");

      if (!token) {
        toast.error("YouTube not connected");
        return;
      }

      // ✅ CHANNEL DATA
      const channelRes = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const channelJson = await channelRes.json();
      const channel = channelJson.items[0];

      const uploadsPlaylistId =
        channel.contentDetails.relatedPlaylists.uploads;

      setChannelData({
        name: channel.snippet.title,
        description: channel.snippet.description,
        subscribers: channel.statistics.subscriberCount,
        views: channel.statistics.viewCount,
        videos: channel.statistics.videoCount
      });

      // ✅ GET VIDEOS FROM UPLOADS PLAYLIST
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const videoJson = await videoRes.json();

      const videoIds = videoJson.items
        .map(v => v.snippet.resourceId.videoId)
        .join(",");

      // ✅ VIDEO STATS
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const statsJson = await statsRes.json();

      const videoList = videoJson.items.map((v, index) => {

        const stats = statsJson.items[index]?.statistics;

        return {
          id: v.snippet.resourceId.videoId,
          title: v.snippet.title,
          thumbnail: v.snippet.thumbnails.medium.url,
          publishedAt: v.snippet.publishedAt,
          views: Number(stats?.viewCount || 0),
          likes: Number(stats?.likeCount || 0),
          comments: Number(stats?.commentCount || 0)
        };

      });

      setVideos(videoList);

      // ✅ 🔥 3-BAR CHART DATA
      const chart = videoList.slice(0, 5).map((v, i) => {

        const views = v.views;
        const likes = v.likes;
        const comments = v.comments;

        // 🔥 Overall score
        const overall = views + (likes * 10) + (comments * 20);

        // 🔥 Watch time (estimated)
        const avgWatchMinutes = 3;
        const watchTime = views * avgWatchMinutes;

        return {
          name: `Video ${i + 1}`,
          views,
          overall,
          watchTime
        };

      });

      setChartData(chart);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load YouTube analytics");

    } finally {

      setLoading(false);

    }

  };

  const formatNumber = (num) => {

    const number = Number(num);

    if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    if (number >= 1000) return (number / 1000).toFixed(1) + "K";

    return number;

  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">YouTube Analytics</h1>
        <p className="text-gray-600">{channelData?.description}</p>
      </div>

      {/* 🔴 CHANNEL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
      >
        <div className="flex items-center space-x-4">

          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
            <Youtube className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">@{channelData?.name}</h2>
            <p className="text-gray-600">{channelData?.description}</p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold">
              {formatNumber(channelData?.subscribers)}
            </p>
            <p className="text-gray-600">subscribers</p>
          </div>

        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatCard
          title="Subscribers"
          value={formatNumber(channelData?.subscribers)}
          icon={Users}
          color="brand"
        />

        <StatCard
          title="Views"
          value={formatNumber(channelData?.views)}
          icon={Eye}
          color="blue"
        />

        <StatCard
          title="Videos"
          value={channelData?.videos}
          icon={Play}
          color="green"
        />

        <StatCard
          title="Growth"
          value="Active"
          icon={TrendingUp}
          color="purple"
        />

      </div>

      {/* 🔥 3 BAR CHART */}
      <ChartCard title="Video Performance Overview">

        <BarChart
          data={chartData}
          bars={[
            { key: "overall", color: "#f97316" },   // orange
            { key: "views", color: "#ef4444" },     // red
            { key: "watchTime", color: "#fb923c" }  // light orange
          ]}
        />

      </ChartCard>

      {/* VIDEOS */}
      <ChartCard title="Latest Uploaded Videos">

        <div className="space-y-4">

          {videos.map((video) => (

            <div
              key={video.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition"
            >

              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 rounded"
              />

              <div className="flex-1">

                <h4 className="font-semibold">{video.title}</h4>

                <p className="text-sm text-gray-500">
                  {new Date(video.publishedAt).toDateString()}
                </p>

                <div className="flex space-x-6 mt-2 text-sm text-gray-600">

                  <span className="flex items-center gap-1">
                    <Eye size={16}/> {formatNumber(video.views)}
                  </span>

                  <span className="flex items-center gap-1">
                    <ThumbsUp size={16}/> {formatNumber(video.likes)}
                  </span>

                  <span className="flex items-center gap-1">
                    <MessageCircle size={16}/> {formatNumber(video.comments)}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </ChartCard>

    </div>
  );

};

export default YouTubeAnalytics;