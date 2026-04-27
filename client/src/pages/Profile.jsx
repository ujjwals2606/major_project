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
  Bell,
  Pencil,
  Check,
  X,
  Sparkles,
  Shield,
  Link2,
  ChevronRight,
  CheckCircle2,
  Crown,
  LogOut,
  Camera,
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
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
    const token = localStorage.getItem("youtube_token");
    if (token) setYoutubeConnected(true);
  }, [user]);

  const connectYouTube = () => {
    window.location.href = YOUTUBE_AUTH_URL;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateUser(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || "", email: user?.email || "" });
    setIsEditing(false);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const connectedPlatforms =
    (youtubeConnected ? 1 : 0) + (user?.instagramConnected ? 1 : 0);

  const platforms = [
    {
      id: "youtube",
      name: "YouTube",
      desc: "Sync analytics and uploads",
      icon: Youtube,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
      connected: youtubeConnected,
      action: connectYouTube,
      available: true,
    },
    {
      id: "instagram",
      name: "Instagram",
      desc: "Track posts and engagement",
      icon: Instagram,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-50",
      connected: !!user?.instagramConnected,
      available: false,
    },
  ];

  const quickActions = [
    { label: "Account Settings", icon: Settings, color: "text-neutral-600" },
    { label: "Change Password", icon: Key, color: "text-amber-600" },
    { label: "Notifications", icon: Bell, color: "text-violet-600" },
    { label: "Privacy & Security", icon: Shield, color: "text-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Profile Settings
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Manage your account information and connected platforms.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Account active
          </div>
        </motion.div>

        {/* Profile hero card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white p-6 sm:p-8"
        >
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-xl ring-2 ring-white/20">
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg hover:scale-105 transition">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80 mb-2">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Free Plan
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">
                {user?.name || "Your Name"}
              </h2>
              <p className="mt-1 text-sm text-white/60 truncate">
                {user?.email || "your@email.com"}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs">
                  <Link2 className="h-3.5 w-3.5 text-indigo-300" />
                  <span className="font-semibold">{connectedPlatforms}</span>
                  <span className="text-white/60">connected</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs">
                  <Calendar className="h-3.5 w-3.5 text-rose-300" />
                  <span className="text-white/60">Joined</span>
                  <span className="font-semibold">
                    {user?.createdAt ? formatDate(user.createdAt) : "—"}
                  </span>
                </div>
              </div>
            </div>

            <button className="hidden sm:inline-flex self-start items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-neutral-900 px-4 py-2 text-sm font-semibold shadow-lg transition">
              <Crown className="h-4 w-4" />
              Upgrade
            </button>
          </div>
        </motion.div>

        {/* Body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal info */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-white border border-neutral-200 overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Personal Information
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Your basic account details
                  </p>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 transition"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition"
                    >
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-1 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1.5 text-xs font-semibold transition shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/60 focus:bg-white focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="h-8 w-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-neutral-500" />
                      </div>
                      <span className="text-sm font-medium text-neutral-900 truncate">
                        {user?.name || "—"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/60 focus:bg-white focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="h-8 w-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-neutral-500" />
                      </div>
                      <span className="text-sm font-medium text-neutral-900 truncate">
                        {user?.email || "—"}
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Joined */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                    Member Since
                  </label>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div className="h-8 w-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-neutral-500" />
                    </div>
                    <span className="text-sm font-medium text-neutral-900">
                      {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connected accounts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl bg-white border border-neutral-200 overflow-hidden"
            >
              <div className="p-5 border-b border-neutral-100">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Connected Accounts
                </h3>
                <p className="text-xs text-neutral-500">
                  Link your platforms to unlock analytics
                </p>
              </div>

              <div className="divide-y divide-neutral-100">
                {platforms.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-5 hover:bg-neutral-50/60 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-11 w-11 rounded-xl ${p.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`h-5 w-5 ${p.iconColor}`} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-neutral-900">
                              {p.name}
                            </p>
                            {p.connected && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-[10px] font-semibold">
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                Linked
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 truncate">
                            {p.desc}
                          </p>
                        </div>
                      </div>

                      {!p.available ? (
                        <span className="inline-flex items-center rounded-full bg-neutral-100 text-neutral-500 px-3 py-1 text-xs font-semibold">
                          Coming soon
                        </span>
                      ) : p.connected ? (
                        <button className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition">
                          <LogOut className="h-3.5 w-3.5" />
                          Disconnect
                        </button>
                      ) : (
                        <button
                          onClick={p.action}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1.5 text-xs font-semibold transition shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                        >
                          <Link2 className="h-3.5 w-3.5" />
                          Connect
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — sidebar */}
          <div className="space-y-6">
            {/* Account overview */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-white border border-neutral-200 p-5"
            >
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                Account Overview
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Account type</p>
                      <p className="text-sm font-bold text-neutral-900">Free</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-orange-700 hover:text-orange-900 transition">
                    Upgrade →
                  </button>
                </div>

                <div className="rounded-xl border border-neutral-100 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-500">
                      Connected platforms
                    </p>
                    <p className="text-xs font-bold text-neutral-900">
                      {connectedPlatforms}/2
                    </p>
                  </div>
                  <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(connectedPlatforms / 2) * 100}%`,
                      }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-neutral-100 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                      Storage
                    </p>
                    <p className="mt-1 text-sm font-bold text-neutral-900">
                      2.4 GB
                    </p>
                  </div>
                  <div className="rounded-xl border border-neutral-100 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                      API calls
                    </p>
                    <p className="mt-1 text-sm font-bold text-neutral-900">
                      1.2k
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl bg-white border border-neutral-200 p-3"
            >
              <h3 className="text-sm font-semibold text-neutral-900 px-2 pt-2 pb-3">
                Quick Actions
              </h3>
              <div className="space-y-0.5">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      className="group w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 ${a.color}`} />
                        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                          {a.label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-0.5 transition" />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Danger zone */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-rose-50/50 border border-rose-200 p-5"
            >
              <h3 className="text-sm font-semibold text-rose-900 mb-1">
                Danger Zone
              </h3>
              <p className="text-xs text-rose-700/80 mb-3">
                Permanently delete your account and all data.
              </p>
              <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-100 text-rose-700 px-3 py-2 text-xs font-semibold transition">
                Delete Account
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
