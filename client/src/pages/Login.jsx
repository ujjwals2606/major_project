import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ===================== LEFT — Brand Panel ===================== */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-10 xl:p-14 text-white">
          {/* Decorative blobs */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

          {/* Logo */}
          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-bold">CM</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Creator-Mitra
              </span>
            </Link>
          </div>

          {/* Middle copy */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/10 px-3 py-1 text-xs font-medium text-white/80 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              Smart analytics for creators
            </div>
            <h2 className="text-3xl xl:text-4xl font-semibold tracking-tight leading-tight">
              Welcome back to your{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-rose-300 bg-clip-text text-transparent">
                creator HQ
              </span>
            </h2>
            <p className="mt-4 text-white/70 max-w-md">
              Sign in to track your YouTube and Instagram performance,
              understand your audience, and grow faster with data-driven
              insights.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 max-w-sm">
              {[
                { icon: BarChart3, text: "Real-time multi-platform analytics" },
                { icon: TrendingUp, text: "Growth signals & smart insights" },
                { icon: ShieldCheck, text: "Bank-grade security, your data is yours" },
              ].map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur px-4 py-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <f.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-white/80">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative flex items-center justify-between text-xs text-white/50">
            <p>© {new Date().getFullYear()} Creator-Mitra</p>
            <div className="flex items-center gap-4">
              <Link to="#" className="hover:text-white transition">
                Privacy
              </Link>
              <Link to="#" className="hover:text-white transition">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== RIGHT — Form Panel ===================== */}
        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Mobile background accent */}
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-100/60 via-rose-100/40 to-transparent lg:hidden -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            {/* Mobile logo + back */}
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2"
              >
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="font-semibold tracking-tight text-neutral-900">
                  Creator-Mitra
                </span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Home
              </Link>
            </div>

            {/* Desktop back link */}
            <Link
              to="/"
              className="hidden lg:inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to home
            </Link>

            <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)] p-6 sm:p-8">
              <div className="mb-7">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                  Sign in to your account
                </h1>
                <p className="mt-1.5 text-sm text-neutral-500">
                  Enter your details to access your dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Password
                    </label>
                    <Link
                      to="#"
                      className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Remember me */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.26 }}
                  className="flex items-center"
                >
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-neutral-600"
                  >
                    Keep me signed in
                  </label>
                </motion.div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.34 }}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:bg-black transition px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-neutral-500 uppercase tracking-wider">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition px-4 py-2.5 text-sm font-medium text-neutral-800"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition px-4 py-2.5 text-sm font-medium text-neutral-800"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.46 2.27-1.21 3.07-.81.86-2.13 1.52-3.21 1.43-.13-1.13.42-2.31 1.16-3.07.83-.86 2.24-1.5 3.26-1.43zM20.5 17.17c-.55 1.27-.81 1.84-1.51 2.97-.98 1.57-2.36 3.53-4.07 3.55-1.52.02-1.91-.99-3.97-.98-2.06.01-2.49 1-4.01.98-1.71-.02-3.02-1.79-4-3.36C.07 16.04-.36 10.7 1.91 7.86c1.61-2.02 4.16-3.21 6.55-3.21 2.43 0 3.96 1.33 5.97 1.33 1.95 0 3.14-1.33 5.95-1.33 2.13 0 4.39 1.16 6 3.17-5.27 2.89-4.42 10.42 0 9.35z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Sign up */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-7 text-center text-sm text-neutral-600"
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-neutral-900 hover:underline underline-offset-4"
                >
                  Sign up for free
                </Link>
              </motion.p>
            </div>

            <p className="mt-6 text-center text-xs text-neutral-500">
              By signing in, you agree to our{" "}
              <Link to="#" className="underline hover:text-neutral-900">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="#" className="underline hover:text-neutral-900">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
