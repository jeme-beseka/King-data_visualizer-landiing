import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  RiBarChartBoxLine,
  RiCursorLine,
  RiDownload2Line,
  RiMoonClearLine,
  RiStackLine,
  RiTableLine,
} from "react-icons/ri";

const features = [
  {
    title: "10+ Chart Types",
    description:
      "From line and bar to radar, heatmap, and bubble views for every analysis workflow.",
    icon: RiBarChartBoxLine,
    proof: "11 chart families",
    featured: true,
  },
  {
    title: "CSV & Manual Input",
    description:
      "Import CSV files instantly or enter values manually in the intuitive data table editor.",
    icon: RiTableLine,
    proof: "Up to 50k rows",
  },
  {
    title: "Interactive Tooltips",
    description:
      "Hover any data point to reveal polished detail overlays with clean metric formatting.",
    icon: RiCursorLine,
    proof: "Point-level precision",
  },
  {
    title: "Multi-Series Support",
    description:
      "Compare multiple series in one chart with clear color coding and instant series switching.",
    icon: RiStackLine,
    proof: "Unlimited overlays",
  },
  {
    title: "Dark & Light Mode",
    description:
      "Switch themes seamlessly. Both dark and light modes are tuned for clarity and comfort.",
    icon: RiMoonClearLine,
    proof: "One-click toggle",
  },
  {
    title: "Export as PNG",
    description:
      "Export any chart as a crisp PNG with one click for reports, decks, and client updates.",
    icon: RiDownload2Line,
    proof: "1-click export",
    featured: true,
  },
];

const Features = () => {
  const shouldReduceMotion = useReducedMotion();
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });
  const [spotlight, setSpotlight] = useState({});

  const handleMouseMove = (event, title) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight((prev) => ({ ...prev, [title]: { x, y } }));
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-dark px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Everything You Need to Visualize Data
          </h2>
          <div className="gold-gradient mx-auto h-1 w-32 rounded-full" />
          <p className="mx-auto max-w-3xl text-slate-300">
            Packed with powerful features designed for analysts, researchers, and data
            enthusiasts.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const iconMotion =
              feature.title === "Multi-Series Support"
                ? { rotate: [0, 7, -7, 0] }
                : feature.title === "Interactive Tooltips"
                  ? { scale: [1, 1.12, 1] }
                  : feature.title === "Export as PNG"
                    ? { y: [0, -3, 0] }
                    : { y: [0, -2, 0] };
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0.25 : 0.55,
                  delay: shouldReduceMotion ? 0 : index * 0.09,
                  ease: shouldReduceMotion ? "linear" : [0.22, 1, 0.36, 1],
                }}
                onMouseMove={(event) => handleMouseMove(event, feature.title)}
                className={`group relative min-h-72 overflow-hidden rounded-2xl border bg-dark-secondary/45 p-6 backdrop-blur-md transition-all duration-300 ${
                  feature.featured
                    ? "border-gold/45 shadow-[0_12px_30px_rgba(184,134,11,0.15)]"
                    : "border-gold/15"
                } hover:scale-[1.02] hover:border-gold/75 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(260px circle at ${spotlight[feature.title]?.x ?? 50}% ${
                      spotlight[feature.title]?.y ?? 50
                    }%, rgba(255, 215, 0, 0.14), rgba(255, 215, 0, 0) 60%)`,
                  }}
                />
                <div className="relative z-10 flex h-full flex-col">
                  <motion.div
                    className="mb-5 inline-flex w-fit rounded-xl border border-gold/30 bg-gold/10 p-3 text-gold-light transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(255,215,0,0.45)]"
                    whileHover={shouldReduceMotion ? {} : iconMotion}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl text-white">{feature.title}</h3>
                    <span className="rounded-full border border-gold/30 bg-dark/70 px-2.5 py-1 text-[11px] text-[#d9be78]">
                      {feature.proof}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{feature.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
