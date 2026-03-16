// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { useAuth } from '../context/AuthContext';
// // import { youtubeAPI, instagramAPI } from '../utils/api';
// // import { StatCard, ChartCard } from '../components/Card';
// // import { LineChart, AreaChart, BarChart } from '../components/Chart';
// // import { 
// //   Users, 
// //   Eye, 
// //   Heart, 
// //   MessageCircle, 
// //   TrendingUp, 
// //   Youtube, 
// //   Instagram,
// //   Plus,
// //   ExternalLink
// // } from 'lucide-react';
// // import { toast } from 'react-hot-toast';

// // const CLIENT_ID = "878235149923-mdl596ntipcc5r0cv0h4eo0bd5nrhphn.apps.googleusercontent.com";

// // const REDIRECT_URI = "http://localhost:3000/auth/youtube/callback";

// // const YOUTUBE_AUTH_URL =
// // `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly&include_granted_scopes=true`;

// // const Dashboard = () => {

// //   const { user } = useAuth();
// //   const [youtubeData, setYoutubeData] = useState(null);
// //   const [instagramData, setInstagramData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const connectYouTube = () => {
// //     window.location.href = YOUTUBE_AUTH_URL;
// //   };

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);

// //       const mockYoutubeData = {
// //         channelInfo: {
// //           channelName: "Your Channel",
// //           subscriberCount: 125000,
// //           videoCount: 45,
// //           viewCount: 2500000
// //         },
// //         engagement: {
// //           totalLikes: 5000,
// //           totalComments: 300
// //         }
// //       };

// //       const mockInstagramData = {
// //         accountInfo: {
// //           username: "your_instagram",
// //           followersCount: 85000,
// //           mediaCount: 120
// //         },
// //         engagement: {
// //           totalLikes: 15000,
// //           totalComments: 800,
// //           engagementRate: 4.2
// //         }
// //       };

// //       setYoutubeData(mockYoutubeData);
// //       setInstagramData(mockInstagramData);

// //     } catch (error) {
// //       console.error('Error fetching dashboard data:', error);
// //       toast.error('Failed to load dashboard data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const formatNumber = (num) => {
// //     if (num >= 1000000) {
// //       return (num / 1000000).toFixed(1) + 'M';
// //     } else if (num >= 1000) {
// //       return (num / 1000).toFixed(1) + 'K';
// //     }
// //     return num.toString();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 space-y-6">

// //       {/* Welcome Section */}

// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //       >
// //         <h1 className="text-3xl font-bold text-gray-900 mb-2">
// //           Welcome back, {user?.name}!
// //         </h1>

// //         <p className="text-gray-600">
// //           Here's what's happening with your content.
// //         </p>

// //       </motion.div>

// //       {/* Stats */}

// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

// //         <StatCard
// //           title="Subscribers"
// //           value={formatNumber(youtubeData?.channelInfo?.subscriberCount || 0)}
// //           icon={Users}
// //           color="brand"
// //         />

// //         <StatCard
// //           title="Views"
// //           value={formatNumber(youtubeData?.channelInfo?.viewCount || 0)}
// //           icon={Eye}
// //           color="blue"
// //         />

// //         <StatCard
// //           title="Likes"
// //           value={formatNumber(youtubeData?.engagement?.totalLikes || 0)}
// //           icon={Heart}
// //           color="green"
// //         />

// //         <StatCard
// //           title="Engagement"
// //           value={`${instagramData?.engagement?.engagementRate || 0}%`}
// //           icon={TrendingUp}
// //           color="purple"
// //         />

// //       </div>

// //       {/* Platform Cards */}

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// //         {/* YouTube */}

// //         <ChartCard title="YouTube Analytics">

// //           <div className="flex items-center justify-between">

// //             <div className="flex items-center space-x-3">

// //               <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
// //                 <Youtube className="w-5 h-5 text-red-600" />
// //               </div>

// //               <div>
// //                 <p className="font-semibold text-gray-900">
// //                   {youtubeData?.channelInfo?.channelName}
// //                 </p>

// //                 <p className="text-sm text-gray-600">
// //                   {formatNumber(youtubeData?.channelInfo?.subscriberCount)} subscribers
// //                 </p>

// //               </div>

// //             </div>

// //             <div className="text-right">

// //               <p className="text-2xl font-bold text-gray-900">
// //                 {formatNumber(youtubeData?.channelInfo?.viewCount)}
// //               </p>

// //               <p className="text-sm text-gray-600">views</p>

// //             </div>

// //           </div>

// //         </ChartCard>

// //         {/* Instagram */}

// //         <ChartCard title="Instagram Analytics">

// //           <div className="flex items-center justify-between">

// //             <div className="flex items-center space-x-3">

// //               <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
// //                 <Instagram className="w-5 h-5 text-pink-600" />
// //               </div>

// //               <div>

// //                 <p className="font-semibold text-gray-900">
// //                   @{instagramData?.accountInfo?.username}
// //                 </p>

// //                 <p className="text-sm text-gray-600">
// //                   {formatNumber(instagramData?.accountInfo?.followersCount)} followers
// //                 </p>

// //               </div>

// //             </div>

// //           </div>

// //         </ChartCard>

// //       </div>

// //       {/* Connect Platforms */}

// //       <div className="card bg-gradient-to-r from-brand-50 to-purple-50 border-brand-200">

// //         <div className="text-center">

// //           <h3 className="text-lg font-semibold text-gray-900 mb-2">
// //             Connect Your Platforms
// //           </h3>

// //           <p className="text-gray-600 mb-4">
// //             Link your YouTube and Instagram accounts.
// //           </p>

// //           <div className="flex flex-col sm:flex-row gap-3 justify-center">

// //             <button
// //               onClick={connectYouTube}
// //               className="btn-primary inline-flex items-center"
// //             >
// //               <Youtube className="w-4 h-4 mr-2" />
// //               Connect YouTube
// //             </button>

// //             <button className="btn-primary inline-flex items-center">
// //               <Instagram className="w-4 h-4 mr-2" />
// //               Connect Instagram
// //             </button>

// //           </div>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { StatCard, ChartCard } from '../components/Card';
// import { Users, Eye, Heart, TrendingUp, Youtube, Instagram } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const CLIENT_ID = "878235149923-mdl596ntipcc5r0cv0h4eo0bd5nrhphn.apps.googleusercontent.com";

// const REDIRECT_URI = "http://localhost:3000/auth/youtube/callback";

// const YOUTUBE_AUTH_URL =
// `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly&include_granted_scopes=true`;

// const Dashboard = () => {

//   const { user } = useAuth();

//   const [youtubeData, setYoutubeData] = useState(null);
//   const [instagramData, setInstagramData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const connectYouTube = () => {
//     window.location.href = YOUTUBE_AUTH_URL;
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {

//       setLoading(true);

//       // Temporary mock data
//       const mockYoutubeData = {
//         channelInfo: {
//           channelName: "Your Channel",
//           subscriberCount: 125000,
//           videoCount: 45,
//           viewCount: 2500000
//         },
//         engagement: {
//           totalLikes: 5000,
//           totalComments: 300
//         }
//       };

//       const mockInstagramData = {
//         accountInfo: {
//           username: "your_instagram",
//           followersCount: 85000,
//           mediaCount: 120
//         },
//         engagement: {
//           totalLikes: 15000,
//           totalComments: 800,
//           engagementRate: 4.2
//         }
//       };

//       setYoutubeData(mockYoutubeData);
//       setInstagramData(mockInstagramData);

//     } catch (error) {

//       console.error("Dashboard error:", error);
//       toast.error("Failed to load dashboard data");

//     } finally {

//       setLoading(false);

//     }
//   };

//   const formatNumber = (num) => {
//     if (!num) return "0";

//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K";

//     return num.toString();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">

//       {/* Welcome */}

//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Welcome back, {user?.name}
//         </h1>

//         <p className="text-gray-600">
//           Here's what's happening with your content.
//         </p>
//       </motion.div>

//       {/* Stats */}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//         <StatCard
//           title="Subscribers"
//           value={formatNumber(youtubeData?.channelInfo?.subscriberCount)}
//           icon={Users}
//           color="brand"
//         />

//         <StatCard
//           title="Views"
//           value={formatNumber(youtubeData?.channelInfo?.viewCount)}
//           icon={Eye}
//           color="blue"
//         />

//         <StatCard
//           title="Likes"
//           value={formatNumber(youtubeData?.engagement?.totalLikes)}
//           icon={Heart}
//           color="green"
//         />

//         <StatCard
//           title="Engagement"
//           value={`${instagramData?.engagement?.engagementRate}%`}
//           icon={TrendingUp}
//           color="purple"
//         />

//       </div>

//       {/* Platform Cards */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* YouTube Card */}

//         <ChartCard title="YouTube Analytics">

//           <div className="flex items-center justify-between">

//             <div className="flex items-center space-x-3">

//               <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                 <Youtube className="w-5 h-5 text-red-600" />
//               </div>

//               <div>

//                 <p className="font-semibold text-gray-900">
//                   {youtubeData?.channelInfo?.channelName}
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   {formatNumber(youtubeData?.channelInfo?.subscriberCount)} subscribers
//                 </p>

//               </div>

//             </div>

//             <div className="text-right">

//               <p className="text-2xl font-bold text-gray-900">
//                 {formatNumber(youtubeData?.channelInfo?.viewCount)}
//               </p>

//               <p className="text-sm text-gray-600">views</p>

//             </div>

//           </div>

//         </ChartCard>

//         {/* Instagram Card */}

//         <ChartCard title="Instagram Analytics">

//           <div className="flex items-center space-x-3">

//             <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
//               <Instagram className="w-5 h-5 text-pink-600" />
//             </div>

//             <div>

//               <p className="font-semibold text-gray-900">
//                 @{instagramData?.accountInfo?.username}
//               </p>

//               <p className="text-sm text-gray-600">
//                 {formatNumber(instagramData?.accountInfo?.followersCount)} followers
//               </p>

//             </div>

//           </div>

//         </ChartCard>

//       </div>

//       {/* Connect Platforms */}

//       <div className="card bg-gradient-to-r from-brand-50 to-purple-50 border-brand-200">

//         <div className="text-center">

//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             Connect Your Platforms
//           </h3>

//           <p className="text-gray-600 mb-4">
//             Link your YouTube and Instagram accounts.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-3 justify-center">

//             <button
//               onClick={connectYouTube}
//               className="btn-primary inline-flex items-center"
//             >
//               <Youtube className="w-4 h-4 mr-2" />
//               Connect YouTube
//             </button>

//             <button className="btn-primary inline-flex items-center">
//               <Instagram className="w-4 h-4 mr-2" />
//               Connect Instagram
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { StatCard, ChartCard } from "../components/Card";
import { Users, Eye, Heart, TrendingUp, Youtube, Instagram } from "lucide-react";
import { toast } from "react-hot-toast";

const CLIENT_ID =
  "878235149923-mdl596ntipcc5r0cv0h4eo0bd5nrhphn.apps.googleusercontent.com";

const REDIRECT_URI = "http://localhost:3000/auth/youtube/callback";

const YOUTUBE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly&include_granted_scopes=true`;

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

      // Temporary Instagram mock
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}
        </h1>

        <p className="text-gray-600">
          Here's what's happening with your content.
        </p>
      </motion.div>

      {/* Stats */}

      {youtubeData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Subscribers"
            value={formatNumber(youtubeData.channelInfo.subscriberCount)}
            icon={Users}
            color="brand"
          />

          <StatCard
            title="Views"
            value={formatNumber(youtubeData.channelInfo.viewCount)}
            icon={Eye}
            color="blue"
          />

          <StatCard
            title="Videos"
            value={formatNumber(youtubeData.channelInfo.videoCount)}
            icon={Heart}
            color="green"
          />

          <StatCard
            title="Engagement"
            value={`${instagramData?.engagement?.engagementRate || 0}%`}
            icon={TrendingUp}
            color="purple"
          />
        </div>
      )}

      {/* Platform Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YouTube */}

        <ChartCard title="YouTube Analytics">
          {youtubeData ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-red-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {youtubeData.channelInfo.channelName}
                  </p>

                  <p className="text-sm text-gray-600">
                    {formatNumber(
                      youtubeData.channelInfo.subscriberCount
                    )}{" "}
                    subscribers
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(youtubeData.channelInfo.viewCount)}
                </p>

                <p className="text-sm text-gray-600">views</p>
              </div>
            </div>
          ) : (
            <button
              onClick={connectYouTube}
              className="btn-primary inline-flex items-center"
            >
              <Youtube className="w-4 h-4 mr-2" />
              Connect YouTube
            </button>
          )}
        </ChartCard>

        {/* Instagram */}

        <ChartCard title="Instagram Analytics">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Instagram className="w-5 h-5 text-pink-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                @{instagramData?.accountInfo?.username}
              </p>

              <p className="text-sm text-gray-600">
                {formatNumber(
                  instagramData?.accountInfo?.followersCount
                )}{" "}
                followers
              </p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Connect Platforms */}

      {!youtubeData && (
        <div className="card bg-gradient-to-r from-brand-50 to-purple-50 border-brand-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Connect Your Platforms
            </h3>

            <p className="text-gray-600 mb-4">
              Link your YouTube and Instagram accounts.
            </p>

            <button
              onClick={connectYouTube}
              className="btn-primary inline-flex items-center"
            >
              <Youtube className="w-4 h-4 mr-2" />
              Connect YouTube
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;