import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronDown, FiChevronUp, FiDownload } from "react-icons/fi";

const V33_RELEASE_NOTES = [
  "Stability and performance improvements across chart rendering and UI responsiveness.",
  "Refined tooltip formatting for multi-series charts and clearer axis labeling.",
  "Theme polish for dark mode panels, tables, and chart chrome.",
  "CSV import reliability improvements for larger files and edge-case encodings.",
  "Export-to-PNG quality and sizing adjustments for high-DPI displays.",
  "Bug fixes from community feedback; see full README for detailed commit history.",
];

const requirements = [
  { label: "Java", value: "Bundled (no installation needed)" },
  { label: "OS", value: "Windows 10 / Windows 11" },
  { label: "RAM", value: "4GB minimum, 8GB recommended" },
  { label: "Storage", value: "200MB free space" },
  { label: "Display", value: "1280×720 minimum" },
];

export default function DownloadSection() {
  const shouldReduceMotion = useReducedMotion();
  const [notesOpen, setNotesOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px",
  });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.12,
          delayChildren: shouldReduceMotion ? 0 : 0.05,
        },
      },
    }),
    [shouldReduceMotion]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
    [shouldReduceMotion]
  );

  const handleDownload = () => {
    window.location.href = "/King_Data_Visualizer-3.3.exe";
  };

  return (
    <section
      id="download"
      ref={ref}
      className="relative overflow-hidden px-6 py-24"
      aria-labelledby="download-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.08),transparent_65%)] blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <div className="relative overflow-hidden rounded-3xl border border-transparent bg-dark-secondary/60 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl p-px"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.55), rgba(184,134,11,0.35), rgba(255,215,0,0.45))",
            }}
          >
            <div className="h-full w-full rounded-[22px] bg-dark/95" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.h2
              id="download-heading"
              variants={itemVariants}
              className="font-display text-3xl leading-tight md:text-5xl"
            >
              Download King Data Visualizer for Windows — Free
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-4 text-slate-300">
              King Data Visualizer is completely free. No subscription, no account required. Built by Jeme Beseka for data analysts, researchers, and students.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-5">
              <span className="inline-flex items-center rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-light md:text-sm">
                Version 3.3 — Production Ready
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 w-full max-w-xl">
              <motion.button
                type="button"
                onClick={handleDownload}
                aria-label="Download King Data Visualizer v3.3 for Windows 10 and Windows 11"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { scale: 1.03, boxShadow: "0 0 32px rgba(255, 215, 0, 0.45)" }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="glow gold-gradient flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold text-dark shadow-[0_16px_40px_rgba(184,134,11,0.35)] md:text-xl"
              >
                <FiDownload size={22} />
                Download for Windows (.exe)
              </motion.button>
              <p className="mt-4 text-sm text-slate-400">
                ~80MB • Windows 10/11 • No account required • Free forever
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative mt-8">
              <button
                type="button"
                disabled
                className="relative inline-flex items-center justify-center rounded-xl border border-gold/40 bg-dark/60 px-6 py-3 text-sm font-semibold text-gold-light opacity-90"
              >
                Try Web App (Coming Soon)
                <span className="absolute -right-2 -top-2 rounded-full border border-gold/30 bg-[#8a6a1e] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-[#f7dda0]">
                  Coming Soon
                </span>
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass mt-12 w-full max-w-2xl rounded-2xl border border-gold/15 p-6 text-left md:p-8"
            >
              <h3 className="mb-4 font-display text-lg text-gold-light">System requirements</h3>
              <ul className="space-y-3 text-sm text-slate-300 md:text-base">
                {requirements.map((row) => (
                  <li key={row.label} className="flex flex-col gap-1 border-b border-gold/10 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-medium text-slate-200">{row.label}</span>
                    <span className="text-slate-400 sm:text-right">{row.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 w-full max-w-2xl text-left">
              <button
                type="button"
                onClick={() => setNotesOpen((o) => !o)}
                aria-expanded={notesOpen}
                className="flex w-full items-center justify-between rounded-xl border border-gold/20 bg-dark/50 px-4 py-3 text-left font-display text-sm text-gold-light transition hover:border-gold/45 md:text-base"
              >
                <span>Release notes — v3.3</span>
                {notesOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {notesOpen && (
                <motion.ul
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                  className="mt-3 space-y-2 rounded-xl border border-gold/10 bg-dark-secondary/50 p-4 text-sm text-slate-400"
                >
                  {V33_RELEASE_NOTES.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                  <li className="pt-2 text-xs text-slate-500">
                  </li>
                </motion.ul>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
