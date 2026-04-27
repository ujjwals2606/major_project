import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Youtube,
  Instagram,
  User,
  LogOut,
  Home,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cm_sidebar_collapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    setCollapsed((c) => {
      localStorage.setItem("cm_sidebar_collapsed", !c ? "1" : "0");
      return !c;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home, end: true },
    { path: "/dashboard/youtube", label: "YouTube", icon: Youtube },
    { path: "/dashboard/instagram", label: "Instagram", icon: Instagram },
    { path: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const bottomItems = [
    { path: "/dashboard/settings", label: "Settings", icon: Settings },
    { path: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
  ];

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const SidebarBody = ({ isCollapsed }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        } px-4 h-16 border-b border-neutral-100`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
            <span className="text-white font-bold text-sm">CM</span>
          </div>
          {!isCollapsed && (
            <span className="text-base font-semibold tracking-tight text-neutral-900 whitespace-nowrap">
              Creator-Mitra
            </span>
          )}
        </Link>
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!isCollapsed && (
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Main
          </p>
        )}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center ${
                    isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                  } py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-neutral-900 text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && !isCollapsed && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-gradient-to-b from-indigo-400 to-rose-400"
                        transition={{ duration: 0.25 }}
                      />
                    )}
                    <Icon
                      className={`h-[18px] w-[18px] flex-shrink-0 ${
                        isActive ? "text-white" : ""
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6">
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Workspace
            </p>
          )}
          <nav className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                    } py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`
                  }
                >
                  <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Upgrade card */}
        {!isCollapsed && (
          <div className="mt-6 relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-4 text-white">
            <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/30 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-rose-500/20 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                <Sparkles className="h-3 w-3 text-indigo-300" />
                PRO
              </div>
              <p className="mt-2 text-sm font-semibold leading-tight">
                Unlock advanced insights
              </p>
              <p className="mt-1 text-xs text-white/60 leading-relaxed">
                Get AI growth signals & multi-platform analytics.
              </p>
              <button className="mt-3 w-full inline-flex items-center justify-center rounded-lg bg-white text-neutral-900 text-xs font-semibold py-2 hover:bg-neutral-100 transition">
                Upgrade
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer / User */}
      <div className="p-3 border-t border-neutral-100">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-neutral-100 transition">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">
                {user?.name || "Creator"}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user?.email || "—"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={toggleCollapse}
              className="h-9 w-9 inline-flex items-center justify-center rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition"
              aria-label="Expand sidebar"
              title="Expand"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center text-white text-sm font-semibold"
              title={user?.name || "Creator"}
            >
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="h-9 w-9 inline-flex items-center justify-center rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">CM</span>
          </div>
          <span className="font-semibold tracking-tight text-neutral-900">
            Creator-Mitra
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-white border-r border-neutral-200 transition-[width] duration-300 ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        <SidebarBody isCollapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition z-10"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarBody isCollapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
