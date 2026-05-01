import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const STEPS = [
  {
    n: 1,
    micro: "Install",
    title: "Download & Install",
    description:
      "Download King Data Visualizer, run the .exe installer, and launch the app. No Java installation required — everything is bundled.",
    Silhouette: SilhouetteInstall,
  },
  {
    n: 2,
    micro: "Import",
    title: "Load Your Data",
    description:
      "Import a CSV file with the Load CSV button, or enter data manually using the built-in table editor. Your data appears instantly in the preview panel.",
    Silhouette: SilhouetteData,
  },
  {
    n: 3,
    micro: "Map",
    title: "Choose Your Axes",
    description:
      "Select which columns go on the X and Y axes using the dropdown menus in the toolbar.",
    Silhouette: SilhouetteAxes,
  },
  {
    n: 4,
    micro: "Visualize",
    title: "Pick a Chart Type",
    description:
      "Choose from 10+ chart types — Line, Bar, Scatter, Pie, Radar, Heatmap, and more.",
    Silhouette: SilhouetteChartPick,
  },
  {
    n: 5,
    micro: "Ship",
    title: "Plot & Export",
    description:
      "Click Plot to generate your visualization. Hover for tooltips, then save as a high-quality PNG.",
    Silhouette: SilhouetteExport,
  },
];

const SHORTCUTS = [
  { combo: ["Ctrl", "O"], label: "Open CSV File", detail: "Load a dataset instantly from disk." },
  { combo: ["Ctrl", "S"], label: "Save Plot", detail: "Export the current visualization as PNG." },
  { combo: ["Ctrl", "R"], label: "Reset Application", detail: "Clear state and start a fresh session." },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
    amount: 0.25,
  });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.82", "end 0.28"],
  });

  const spineProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 80, damping: 28, mass: 0.35 }
  );

  const spineHeightPct = useTransform(spineProgress, (p) => `${Math.round(p * 100)}%`);
  const spineGlowPct = useTransform(spineProgress, (p) => `${Math.round(p * 100)}%`);

  const stepDelays = useMemo(
    () => STEPS.map((_, i) => (shouldReduceMotion ? 0 : i * 0.3)),
    [shouldReduceMotion]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark px-6 py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center lg:max-w-4xl">
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl text-white md:text-4xl"
          >
            How to Use King Data Visualizer
          </h2>
          <div className="gold-gradient mx-auto h-1 w-32 rounded-full" />
          <p className="text-base text-slate-300 md:text-lg">
            Five steps from install to export—no setup or account.
          </p>
          <p className="text-xs leading-relaxed text-slate-500 md:text-sm">
            The flow below reflects the desktop app. Steps may differ slightly when the web app
            ships.
          </p>
        </div>

        <div
          ref={timelineRef}
          className="relative mx-auto mb-16 max-w-3xl md:max-w-160"
        >
          {/* Full-height dim track */}
          <div
            className="pointer-events-none absolute left-[19px] top-8 bottom-8 w-[2px] rounded-full bg-linear-to-b from-gold/10 via-charcoal to-gold/10 md:left-[21px]"
            aria-hidden
          />

          {/* Scroll-driven “draw” + brighter fill */}
          <motion.div
            className="pointer-events-none absolute left-[19px] top-8 w-[2px] origin-top rounded-full bg-gold/35 md:left-[21px]"
            style={{ height: spineHeightPct }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute left-[19px] top-8 w-[2px] origin-top rounded-full bg-linear-to-b from-gold-light/90 via-gold to-gold-light/85 shadow-[0_0_12px_rgba(255,215,0,0.35)] md:left-[21px]"
            style={{ height: spineGlowPct }}
            aria-hidden
          />

          <div className="relative space-y-0">
            {STEPS.map((step, index) => {
              const Icon = step.Silhouette;
              return (
                <motion.article
                  key={step.n}
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 26,
                  }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.55,
                    delay: stepDelays[index],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex gap-6 pb-12 last:pb-0 md:gap-10"
                >
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <motion.div
                      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-dark ring-4 ring-dark md:h-11 md:w-11"
                      initial={false}
                      animate={
                        inView
                          ? shouldReduceMotion
                            ? {}
                            : { scale: [1, 1.06, 1] }
                          : {}
                      }
                      transition={{
                        delay: stepDelays[index] + 0.05,
                        duration: 0.45,
                        ease: "easeOut",
                      }}
                    >
                      <span className="gold-gradient absolute inset-0 rounded-full opacity-95" />
                      <span className="relative font-display text-sm font-bold text-dark md:text-base">
                        {step.n}
                      </span>
                    </motion.div>
                  </div>

                  <div className="relative min-w-0 flex-1 pt-1">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2 md:max-w-[min(100%,420px)]">
                        <span className="inline-block rounded-full border border-gold/25 bg-dark-secondary/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#cbb06d]">
                          {step.micro}
                        </span>
                        <h3 className="font-display text-xl text-white md:text-2xl">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-400 md:text-[15px]">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 justify-start md:w-36 md:justify-end md:pt-1">
                        <div className="rounded-xl border border-gold/15 bg-dark-secondary/50 p-2 shadow-inner backdrop-blur-sm">
                          <Icon />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl border border-gold/15 bg-dark-secondary/35 p-6 backdrop-blur-md md:p-8">
          <div className="mb-6 text-center md:text-left">
            <p className="font-display text-sm text-gold-light md:text-base">
              Power user tips
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Keyboard shortcuts • Windows
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {SHORTCUTS.map(({ combo, label, detail }) => (
              <div
                key={label}
                className="flex flex-col rounded-xl border border-gold/10 bg-dark/55 p-4 transition hover:border-gold/35 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-3 flex flex-wrap items-center gap-1">
                  {combo.map((key, idx) => (
                    <span key={`${label}-${idx}`} className="flex items-center gap-1">
                      {idx > 0 && (
                        <span className="text-[10px] font-medium text-slate-500">
                          +
                        </span>
                      )}
                      <kbd className="inline-flex items-center rounded border border-gold/25 bg-charcoal px-2 py-1 font-mono text-[11px] font-semibold text-gold-light shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)]">
                        {key}
                      </kbd>
                    </span>
                  ))}
                </div>
                <p className="font-display text-sm text-white">{label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SilhouetteInstall() {
  return (
    <svg
      width="116"
      height="72"
      viewBox="0 0 116 72"
      className="opacity-90"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="104"
        height="56"
        rx="6"
        fill="rgba(13,13,26,0.65)"
        stroke="rgba(255,215,0,0.35)"
      />
      <rect x="20" y="18" width="76" height="6" rx="2" fill="rgba(184,134,11,0.45)" />
      <rect x="20" y="30" width="52" height="5" rx="2" fill="rgba(148,154,174,0.35)" />
      <rect x="20" y="40" width="64" height="5" rx="2" fill="rgba(148,154,174,0.25)" />
      <rect x="36" y="52" width="44" height="10" rx="3" fill="rgba(255,215,0,0.55)" stroke="rgba(255,215,0,0.45)" />
    </svg>
  );
}

function SilhouetteData() {
  return (
    <svg
      width="116"
      height="72"
      viewBox="0 0 116 72"
      className="opacity-90"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="104"
        height="56"
        rx="6"
        fill="rgba(13,13,26,0.65)"
        stroke="rgba(255,215,0,0.25)"
      />
      {[14, 24, 34, 44, 54].flatMap((y, i) =>
        [18, 40, 62, 84].map((x, j) => (
          <rect
            key={`${i}-${j}`}
            x={x}
            y={y}
            width={j === 0 ? 18 : 14}
            height={6}
            rx={2}
            fill={
              i < 3 && j < 3
                ? i === 2 && j === 2
                  ? "rgba(255,215,0,0.65)"
                  : "rgba(0,180,216,0.35)"
                : "rgba(148,154,174,0.22)"
            }
          />
        ))
      )}
    </svg>
  );
}

function SilhouetteAxes() {
  return (
    <svg
      width="116"
      height="72"
      viewBox="0 0 116 72"
      className="opacity-90"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="104"
        height="56"
        rx="6"
        fill="rgba(13,13,26,0.65)"
        stroke="rgba(255,215,0,0.25)"
      />
      <polyline fill="none" stroke="rgba(255,215,0,0.45)" strokeWidth="2" points="18,56 94,56 94,18" />
      <rect x="22" y="18" width="58" height="12" rx="3" fill="rgba(148,154,174,0.25)" stroke="rgba(184,134,11,0.35)" />
      <rect x="22" y="34" width="58" height="12" rx="3" fill="rgba(148,154,174,0.18)" stroke="rgba(148,154,174,0.35)" />
    </svg>
  );
}

function SilhouetteChartPick() {
  return (
    <svg
      width="116"
      height="72"
      viewBox="0 0 116 72"
      className="opacity-90"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="104"
        height="56"
        rx="6"
        fill="rgba(13,13,26,0.65)"
        stroke="rgba(255,215,0,0.25)"
      />
      <rect x="16" y="40" width="18" height="18" rx="3" fill="rgba(148,154,174,0.2)" stroke="rgba(148,154,174,0.35)" />
      <rect x="42" y="36" width="18" height="22" rx="3" fill="rgba(148,154,174,0.2)" stroke="rgba(148,154,174,0.35)" />
      <rect x="68" y="32" width="18" height="26" rx="3" fill="rgba(148,154,174,0.2)" stroke="rgba(148,154,174,0.35)" />
      <polyline fill="none" stroke="rgba(255,215,0,0.55)" strokeWidth="2" points="18,50 92,26" />
    </svg>
  );
}

function SilhouetteExport() {
  return (
    <svg
      width="116"
      height="72"
      viewBox="0 0 116 72"
      className="opacity-90"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="104"
        height="56"
        rx="6"
        fill="rgba(13,13,26,0.65)"
        stroke="rgba(255,215,0,0.35)"
      />
      <polyline fill="rgba(255,215,0,0.08)" stroke="rgba(255,215,0,0.65)" strokeWidth="2" points="22,52 72,52 92,38" />
      <polyline fill="none" stroke="rgba(0,180,216,0.85)" strokeWidth="2" points="74,54 94,54 94,34 78,34" />
    </svg>
  );
}
