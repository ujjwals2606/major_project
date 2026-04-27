import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
  Youtube,
  Instagram,
  Star,
  Sparkles,
  Zap,
  PlayCircle,
  LineChart,
  Globe,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Home = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get detailed insights into your content performance with comprehensive analytics.",
      tint: "from-indigo-500/15 to-indigo-500/0 text-indigo-600",
    },
    {
      icon: Users,
      title: "Audience Insights",
      description:
        "Understand your audience better with demographic and engagement data.",
      tint: "from-emerald-500/15 to-emerald-500/0 text-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description:
        "Monitor your growth across platforms with real-time metrics.",
      tint: "from-violet-500/15 to-violet-500/0 text-violet-600",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security measures.",
      tint: "from-amber-500/15 to-amber-500/0 text-amber-600",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Your Accounts",
      description:
        "Link your YouTube and Instagram accounts securely with OAuth integration.",
      icon: Globe,
    },
    {
      number: "02",
      title: "Analyze Your Data",
      description:
        "View comprehensive analytics and insights about your content performance.",
      icon: LineChart,
    },
    {
      number: "03",
      title: "Optimize & Grow",
      description:
        "Use data-driven insights to optimize your content strategy and grow your audience.",
      icon: Zap,
    },
  ];

  const stats = [
    { label: "Active Creators", value: "10,000+" },
    { label: "Platforms Supported", value: "2" },
    { label: "Data Points Tracked", value: "50+" },
    { label: "Success Rate", value: "95%" },
  ];

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "YouTuber · 250K subs",
      quote:
        "Creator-Mitra completely changed how I plan content. The insights are gold.",
    },
    {
      name: "Priya Verma",
      role: "Instagram Creator",
      quote:
        "Finally a dashboard that doesn't feel cluttered. Clean, fast, and accurate.",
    },
    {
      name: "Rohan Mehta",
      role: "Content Studio Owner",
      quote:
        "We track all our creators in one place now. The growth signals are spot on.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[520px] w-[1100px] rounded-full bg-gradient-to-tr from-indigo-200 via-violet-200 to-rose-200 opacity-40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex justify-center"
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 shadow-sm hover:shadow transition"
            >
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                New · Smart Growth Insights
              </span>
              <span className="h-3.5 w-px bg-neutral-200" />
              <span className="inline-flex items-center gap-1 text-neutral-500 group-hover:text-neutral-900 transition">
                Try free <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-8 text-center font-semibold tracking-tight text-4xl sm:text-5xl lg:text-7xl leading-[1.05]"
          >
            Empowering creators
            <br className="hidden sm:block" />
            with{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 bg-clip-text text-transparent">
              smart analytics
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 text-center text-base sm:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Track your YouTube and Instagram performance, understand your
            audience, and grow your creator business with data-driven insights.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:bg-black transition px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              Get started free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition px-6 py-3 text-sm sm:text-base font-semibold text-neutral-900 shadow-sm"
            >
              <PlayCircle className="h-4 w-4" />
              Sign in
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-5 text-center text-xs text-neutral-500"
          >
            No credit card required · Free forever plan
          </motion.p>

          {/* Hero preview card */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate="show"
            className="mt-16 sm:mt-20 mx-auto max-w-5xl"
          >
            <div className="relative rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-100 bg-neutral-50/60">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-neutral-500 font-mono">
                  app.creator-mitra.com/dashboard
                </span>
              </div>
              <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Subscribers", value: "125.4K", trend: "+12.4%" },
                  { label: "Total Views", value: "2.5M", trend: "+8.1%" },
                  { label: "Engagement", value: "4.8%", trend: "+2.3%" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-neutral-200 bg-white p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium">
                      {s.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <TrendingUp className="h-3 w-3" />
                      {s.trend} this month
                    </p>
                  </div>
                ))}
                <div className="sm:col-span-3 rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold">Audience growth</p>
                    <span className="text-xs text-neutral-500">Last 30 days</span>
                  </div>
                  <svg viewBox="0 0 600 120" className="w-full h-24">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,90 C60,80 90,60 150,55 C210,50 240,75 300,65 C360,55 390,30 450,25 C510,20 540,40 600,30 L600,120 L0,120 Z"
                      fill="url(#g1)"
                    />
                    <path
                      d="M0,90 C60,80 90,60 150,55 C210,50 240,75 300,65 C360,55 390,30 450,25 C510,20 540,40 600,30"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="py-16 sm:py-20 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-10">
            Trusted by creators worldwide
          </p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center rounded-2xl border border-neutral-100 bg-gradient-to-b from-white to-neutral-50 p-6 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-20 sm:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Everything you need to grow
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600">
              Powerful analytics tools designed specifically for content creators.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group relative rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.tint} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  />
                  <div
                    className={`relative w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.tint}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="relative mt-5 text-base font-semibold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="relative mt-1.5 text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 mb-4">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Get started in minutes
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600">
              Three simple steps to unlock creator-grade analytics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="relative rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-7 hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
                      STEP {step.number}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-20 sm:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Loved by creators
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600">
              Real feedback from creators using Creator-Mitra every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-800 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 text-white flex items-center justify-center text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PLATFORMS ===================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-10 sm:p-14 text-center"
          >
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Connect your platforms
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                Seamlessly integrate with your favorite social media platforms in
                a single click.
              </p>

              <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 px-5 py-3.5 text-white"
                >
                  <Youtube className="h-6 w-6 text-red-500" />
                  <span className="font-semibold">YouTube</span>
                  <CheckCircle className="h-4 w-4 text-emerald-400 ml-1" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 px-5 py-3.5 text-white"
                >
                  <Instagram className="h-6 w-6 text-pink-400" />
                  <span className="font-semibold">Instagram</span>
                  <CheckCircle className="h-4 w-4 text-emerald-400 ml-1" />
                </motion.div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 backdrop-blur border border-white/10 border-dashed px-5 py-3.5 text-white/60">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">More coming soon</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-20 sm:py-28 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Ready to grow your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
                creator business?
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Join thousands of creators using Creator-Mitra to optimize their
              content strategy and unlock real growth.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition px-7 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
              >
                Start free trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition px-7 py-3.5 text-base font-semibold text-neutral-900 shadow-sm"
              >
                Sign in
              </Link>
            </div>
            <p className="mt-5 text-xs text-neutral-500">
              Free forever plan · No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
