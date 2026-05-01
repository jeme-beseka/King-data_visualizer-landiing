import { useEffect, useMemo, useState, memo, lazy, Suspense } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { Link } from "react-scroll";

// Lazy load the chart component to defer Recharts loading
const HeroChart = lazy(() => import("./HeroChart"));

const baseData = [
  { name: "Mon", revenue: 42, forecast: 38, volatility: 28 },
  { name: "Tue", revenue: 46, forecast: 41, volatility: 31 },
  { name: "Wed", revenue: 51, forecast: 48, volatility: 33 },
  { name: "Thu", revenue: 57, forecast: 52, volatility: 30 },
  { name: "Fri", revenue: 63, forecast: 58, volatility: 27 },
  { name: "Sat", revenue: 60, forecast: 56, volatility: 25 },
  { name: "Sun", revenue: 67, forecast: 61, volatility: 23 },
];

const trustPoints = ["Offline-first", "No account required", "Windows 10/11", "~80MB"];

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [chartData, setChartData] = useState(baseData);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Parallax effect for chart card
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50], { clamp: true });
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8], { clamp: true });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setChartData((prev) =>
        prev.map((item) => ({
          ...item,
          revenue: Math.max(35, Math.min(78, item.revenue + (Math.random() * 4 - 2))),
          forecast: Math.max(32, Math.min(74, item.forecast + (Math.random() * 3 - 1.5))),
          volatility: Math.max(15, Math.min(38, item.volatility + (Math.random() * 2 - 1))),
        }))
      );
    }, 1700);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    let timeoutId;
    const onScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setHasScrolled(window.scrollY > 60);
      }, 16);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const staggerChildren = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: shouldReduceMotion ? 0 : 0.2 * i,
          duration: 0.6,
          ease: "easeOut",
        },
      }),
    }),
    [shouldReduceMotion]
  );

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/King_Data_Visualizer-3.3.exe";
    a.download = "King_Data_Visualizer-3.3.exe";
    a.click();
  };

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden px-6 pb-14 pt-28 md:min-h-screen" role="region" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.18),rgba(255,215,0,0)_70%)] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <motion.p
            custom={0}
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="font-display text-xs uppercase tracking-[0.24em] text-[#d5b96f]"
          >
            Desktop Data Visualization | v3.3 | Windows
          </motion.p>

          <motion.h1
            id="hero-heading"
            custom={1}
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="gold-gradient bg-clip-text text-transparent">King</span>{" "}
            Data Visualizer
          </motion.h1>

          <motion.p
            custom={2}
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-lg text-slate-300 md:text-xl"
          >
            From CSV to executive-ready charts in under 60 seconds. King Data Visualizer is a free desktop data visualization app that transforms your data into stunning, interactive visualizations in a native desktop workspace.
          </motion.p>

          <motion.div
            custom={3}
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <div className="relative">
              {!shouldReduceMotion && (
                <>
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-2 -top-2 h-2 w-2 rounded-full bg-gold-light"
                    animate={{ y: [0, -8, 0], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f8df9f]"
                    animate={{ y: [0, -6, 0], opacity: [0.1, 0.9, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </>
              )}
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Download King Data Visualizer for Windows"
                className="glow gold-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-dark transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FiDownload size={16} />
                Download for Windows
              </button>
            </div>

            <button
              type="button"
              className="relative inline-flex items-center rounded-xl border border-gold px-6 py-3 text-sm font-semibold text-gold-light transition-colors hover:bg-gold/10"
            >
              Try Web App
              <span className="absolute -right-2 -top-2 rounded-full border border-gold/30 bg-[#8a6a1e] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-[#f7dda0]">
                Coming Soon
              </span>
            </button>
          </motion.div>

          <motion.div
            custom={4}
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3 text-sm text-slate-400"
          >
            {trustPoints.map((point) => (
              <span key={point} className="rounded-full border border-gold/20 bg-dark-secondary/60 px-3 py-1">
                {point}
              </span>
            ))}
            <span className="text-xs text-[#c8ab64]">Latest stable: v3.3 • SHA256 available</span>
          </motion.div>
          
          {/* Visually hidden SEO text for Google */}
          <p className="sr-only text-xs text-slate-500">
            King Data Visualizer is a free Windows desktop application by Jeme Beseka for creating interactive data visualizations from CSV files and manual data entry.
          </p>
        </div>

        <motion.div
          className="relative"
          style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 1 : opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <motion.div
            className="glass mx-auto w-full max-w-xl rounded-2xl p-4 md:p-5"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -20, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            style={{ willChange: 'transform' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-display text-sm text-gold-light">Live Analytics Preview</p>
                <p className="text-xs text-slate-400">Revenue • Forecast • Volatility</p>
              </div>
              <div className="rounded-md border border-gold/25 bg-dark px-2 py-1 text-xs text-[#d1b15d]">
                Real-time render
              </div>
            </div>

            <div className="h-64 w-full min-h-[256px]">
              <Suspense fallback={<div className="flex h-full items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>}>
                <HeroChart chartData={chartData} />
              </Suspense>
            </div>
          </motion.div>
          <div className="pointer-events-none absolute inset-x-8 -bottom-6 -z-10 h-14 rounded-full bg-gold/20 blur-2xl" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={
          shouldReduceMotion || hasScrolled
            ? { opacity: 0 }
            : { y: [0, 8, 0], opacity: [0.35, 1, 0.35] }
        }
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <Link
          to="features"
          smooth
          offset={-80}
          duration={500}
          aria-label="Scroll to next section"
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gold/35 p-2 text-gold-light"
        >
          <FiArrowDown />
        </Link>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
