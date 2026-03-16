import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Calendar,
  Youtube,
  Instagram,
  Settings,
  Key,
  Bell
} from "lucide-react";
import { toast } from "react-hot-toast";

const CLIENT_ID =
  "878235149923-mdl596ntipcc5r0cv0h4eo0bd5nrhphn.apps.googleusercontent.com";

const REDIRECT_URI = "http://localhost:3000/auth/youtube/callback";

const YOUTUBE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly&include_granted_scopes=true`;

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      });
    }

    // CHECK YOUTUBE TOKEN
    const token = localStorage.getItem("youtube_token");
    if (token) {
      setYoutubeConnected(true);
    }
  }, [user]);

  const connectYouTube = () => {
    window.location.href = YOUTUBE_AUTH_URL;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      updateUser(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || ""
    });

    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const connectedPlatforms =
    (youtubeConnected ? 1 : 0) + (user?.instagramConnected ? 1 : 0);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your account information and connected platforms
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">

          {/* PERSONAL INFO */}

          <div className="card">

            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>

                  <button onClick={handleSubmit} className="btn-primary">
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">

              {/* NAME */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                    <User size={18} />
                    <span>{user?.name}</span>
                  </div>
                )}
              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium mb-1">
                  Email
                </label>

                {isEditing ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                    <Mail size={18} />
                    <span>{user?.email}</span>
                  </div>
                )}
              </div>

              {/* JOIN DATE */}

              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <Calendar size={18} />
                <span>
                  {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                </span>
              </div>

            </div>

          </div>

          {/* CONNECTED ACCOUNTS */}

          <div className="card">

            <h2 className="text-xl font-semibold mb-4">
              Connected Accounts
            </h2>

            {/* YOUTUBE */}

            <div className="flex justify-between items-center border p-4 rounded mb-3">

              <div className="flex items-center gap-3">
                <Youtube className="text-red-600" />
                <span>YouTube</span>
              </div>

              {youtubeConnected ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
                  Connected
                </span>
              ) : (
                <button
                  onClick={connectYouTube}
                  className="btn-primary"
                >
                  Connect
                </button>
              )}

            </div>

            {/* INSTAGRAM */}

            <div className="flex justify-between items-center border p-4 rounded">

              <div className="flex items-center gap-3">
                <Instagram className="text-pink-600" />
                <span>Instagram</span>
              </div>

              <span className="text-gray-500">
                Coming Soon
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-6">

          {/* ACCOUNT OVERVIEW */}

          <div className="card">

            <h3 className="font-semibold mb-3">
              Account Overview
            </h3>

            <div className="flex justify-between mb-2">
              <span>Account Type</span>
              <span className="font-medium">Free</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Connected Platforms</span>
              <span>{connectedPlatforms}/2</span>
            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className="card">

            <h3 className="font-semibold mb-3">
              Quick Actions
            </h3>

            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full">
              <Settings size={18} /> Settings
            </button>

            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full">
              <Key size={18} /> Change Password
            </button>

            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full">
              <Bell size={18} /> Notifications
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;