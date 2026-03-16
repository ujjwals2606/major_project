import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StatCard, ChartCard } from "../components/Card";
import { LineChart, BarChart } from "../components/Chart";
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

      // CHANNEL DATA
      const channelRes = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const channelJson = await channelRes.json();
      const channel = channelJson.items[0];

      setChannelData({
        name: channel.snippet.title,
        description: channel.snippet.description,
        subscribers: channel.statistics.subscriberCount,
        views: channel.statistics.viewCount,
        videos: channel.statistics.videoCount
      });

      // GET VIDEOS
      const videoRes = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&mine=true&type=video&maxResults=10",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const videoJson = await videoRes.json();

      const videoIds = videoJson.items.map(v => v.id.videoId).join(",");

      // GET VIDEO STATS
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
          id: v.id.videoId,
          title: v.snippet.title,
          thumbnail: v.snippet.thumbnails.medium.url,
          publishedAt: v.snippet.publishedAt,
          views: stats?.viewCount || 0,
          likes: stats?.likeCount || 0,
          comments: stats?.commentCount || 0
        };

      });

      setVideos(videoList);

      // CHART DATA (last 5 videos views)
      const chart = videoList.slice(0,5).map((v,i)=>({
        name:`Video ${i+1}`,
        views:Number(v.views)
      }));

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

    if (number >= 1000000) return (number/1000000).toFixed(1)+"M";
    if (number >= 1000) return (number/1000).toFixed(1)+"K";

    return number;

  };

  if (loading) {

    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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

      {/* CHART */}

      <ChartCard title="Recent Video Performance">

        <BarChart
          data={chartData}
          dataKey="views"
          color="#ef4444"
        />

      </ChartCard>

      {/* LATEST VIDEOS */}

      <ChartCard title="Latest Uploaded Videos">

        <div className="space-y-4">

          {videos.map((video)=>(

            <div
              key={video.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
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