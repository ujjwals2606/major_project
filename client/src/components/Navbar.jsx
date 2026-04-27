import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close profile on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest("[data-profile-menu]")) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/#features", label: "Features" },
    { to: "/#pricing", label: "Pricing" },
  ];

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/70 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]"
          : "bg-white/60 backdrop-blur border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900">
              Creator-Mitra
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {!isAuthenticated &&
              publicLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition"
                >
                  {l.label}
                </Link>
              ))}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname.startsWith("/dashboard")
                    ? "text-neutral-900 bg-neutral-100"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative" data-profile-menu>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 px-2 py-1.5 transition"
                >
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white text-xs font-semibold">
                    {initials}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-neutral-800 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-500 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] overflow-hidden"
                    >
                      <div className="p-4 border-b border-neutral-100 bg-gradient-to-br from-neutral-50 to-white">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white text-sm font-semibold">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-neutral-900 truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-1.5">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition"
                        >
                          <LayoutDashboard className="h-4 w-4 text-neutral-500" />
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition"
                        >
                          <User className="h-4 w-4 text-neutral-500" />
                          Profile
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition"
                        >
                          <Settings className="h-4 w-4 text-neutral-500" />
                          Settings
                        </Link>
                      </div>

                      <div className="p-1.5 border-t border-neutral-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 text-sm font-semibold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transition"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-neutral-100 bg-white"
          >
            <div className="px-4 py-4 space-y-1">
              {!isAuthenticated &&
                publicLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
                  >
                    {l.label}
                  </Link>
                ))}

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
                >
                  Dashboard
                </Link>
              )}

              {!isAuthenticated && (
                <div className="pt-3 mt-3 border-t border-neutral-100 grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-neutral-800 transition"
                  >
                    Get started
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <div className="pt-3 mt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white text-sm font-semibold">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
