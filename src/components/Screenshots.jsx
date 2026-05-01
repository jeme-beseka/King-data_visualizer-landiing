import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const screenshotModules = import.meta.glob(
  [
    "../assets/screenshots/welcome-screen.png",
    "../assets/screenshots/screen.png",
    "../assets/screenshots/bar-chart-units.png",
    "../assets/screenshots/pie-chart-profit.png",
    "../assets/screenshots/radar-chart-players.png",
    "../assets/screenshots/dark-mode-histogram.png",
    "../assets/screenshots/scatter-multi-series.png",
    "../assets/screenshots/tooltip-line-chart.png",
    "../assets/screenshots/tooltip-line-chart.png",
  ],
  { eager: true, import: "default" }
);

function pickScreenshot(...needles) {
  const normalized = Object.entries(screenshotModules).map(([path, url]) => [
    path.replaceAll("\\", "/").toLowerCase(),
    url,
  ]);
  for (const needle of needles) {
    const n = needle.toLowerCase();
    const hit = normalized.find(([path]) => path.includes(n));
    if (hit) return hit[1];
  }
  return "";
}

const welcomeScreen =
  pickScreenshot("welcome-screen") || pickScreenshot("screen.png");
const barChartUnits = pickScreenshot("bar-chart-units");
const pieChartProfit = pickScreenshot("pie-chart-profit");
const radarChartPlayers = pickScreenshot("radar-chart-players");
const darkModeHistogram = pickScreenshot("dark-mode-histogram");
const scatterMultiSeries = pickScreenshot("scatter-multi-series");
const tooltipLineChart =
  pickScreenshot("tooltip-line-chart", "tooltip-line- chart", "tooltip");
const CHART_TYPES_SLIDES = [
  {
    image: barChartUnits,
    caption:
      "Bar Chart — Monthly Units Sold. Compare categorical data at a glance with clean, readable bars.",
  },
  {
    image: pieChartProfit,
    caption:
      "Pie Chart — Profit Distribution by Month. Instantly see proportional breakdowns across categories.",
  },
  {
    image: radarChartPlayers,
    caption:
      "Radar Chart — Player Attribute Comparison. Multi-series spider chart for multi-dimensional analysis.",
  },
];

const TABS = [
  {
    id: "welcome",
    label: "Welcome Screen",
    thumbnail: welcomeScreen,
    kind: "single",
    image: welcomeScreen,
    caption:
      "The King Data Visualizer welcome screen — clean, modern, and immediately guides you into the app.",
    note: "First thing you see on launch. Click 'Get Started' to enter the main interface.",
  },
  {
    id: "chart-types",
    label: "Chart Types",
    thumbnail: radarChartPlayers,
    kind: "carousel",
    slides: CHART_TYPES_SLIDES,
    note: null,
  },
  {
    id: "dark-mode",
    label: "Dark Mode",
    thumbnail: darkModeHistogram,
    kind: "single",
    image: darkModeHistogram,
    caption:
      "Full dark mode — every element of the interface adapts, including charts, panels, and the toolbar.",
    note: "Toggle dark/light mode anytime with the Theme button. Your eyes will thank you.",
  },
  {
    id: "tooltips",
    label: "Interactive Tooltips",
    thumbnail: tooltipLineChart,
    kind: "single",
    image: tooltipLineChart,
    caption:
      "Hover over any data point to see precise values instantly — available on all 10+ chart types.",
    note: "Tooltip shows: Series Name, Metric, and Value — formatted cleanly for fast reading.",
  },
  {
    id: "multi-series",
    label: "Multi-Series Charts",
    thumbnail: scatterMultiSeries,
    kind: "single",
    image: scatterMultiSeries,
    caption:
      "Scatter Plot with 5 simultaneous data series — each player shown in a distinct color and marker shape.",
    note: "Select which series to display using the built-in series selector dialog.",
  },
];

function WindowFrame({ children, active }) {
  return (
    <div
      className={`overflow-hidden rounded-xl transition-shadow duration-500 md:rounded-[12px] ${
        active
          ? "shadow-[0_0_40px_rgba(184,134,11,0.3)] ring-1 ring-gold/40"
          : "shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-gold/15"
      }`}
    >
      <div className="hidden border-b border-gold/15 bg-dark-secondary/95 md:block">
        <div className="flex h-11 items-center gap-3 px-3">
          <div className="flex gap-1.5 pl-1" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <p className="flex-1 text-center font-display text-xs tracking-wide text-slate-300">
            King Data Visualizer
          </p>
          <span className="w-14" aria-hidden />
        </div>
      </div>
      <div className="border border-gold/25 bg-dark md:border-0 md:border-x md:border-b md:border-gold/20">
        {children}
      </div>
    </div>
  );
}

function MobileSimpleFrame({ children, active }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gold/35 bg-dark transition-shadow duration-500 md:hidden ${
        active ? "shadow-[0_0_32px_rgba(184,134,11,0.28)]" : "shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      }`}
    >
      {children}
    </div>
  );
}

export default function Screenshots() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  const tab = TABS[activeTab];

  useEffect(() => {
    setSlideIndex(0);
  }, [activeTab]);

  const carouselMeta = useMemo(() => {
    if (tab.kind !== "carousel") return null;
    return {
      total: tab.slides.length,
      slide: tab.slides[slideIndex],
    };
  }, [tab, slideIndex]);

  const goPrev = () => {
    if (tab.kind !== "carousel") return;
    setSlideIndex((i) => (i - 1 + tab.slides.length) % tab.slides.length);
  };

  const goNext = () => {
    if (tab.kind !== "carousel") return;
    setSlideIndex((i) => (i + 1) % tab.slides.length);
  };

  const captionText =
    tab.kind === "carousel" && carouselMeta
      ? carouselMeta.slide.caption
      : tab.caption;

  const noteText =
    tab.kind === "carousel"
      ? "Use arrows to explore three chart styles from the desktop app."
      : tab.note;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark px-6 py-24"
      aria-labelledby="screenshots-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.12),transparent_68%)] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: shouldReduceMotion ? 0.25 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="mb-10 space-y-4 text-center">
          <h2
            id="screenshots-heading"
            className="font-display text-3xl text-white md:text-4xl"
          >
            See It In Action
          </h2>
          <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-2">
            <motion.div
              className="gold-gradient h-1 w-full max-w-[200px] rounded-full"
              initial={{ scaleX: 0.2, opacity: 0.4 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 1.1,
                ease: "easeInOut",
                repeat: shouldReduceMotion ? 0 : Infinity,
                repeatType: "reverse",
              }}
              style={{ transformOrigin: "center" }}
            />
          </div>
          <p className="mx-auto max-w-2xl text-slate-300">
            A professional desktop application designed for clarity, power, and elegance.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-center">
          {TABS.map((t, index) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(index)}
              aria-pressed={activeTab === index}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition outline-none ring-gold-light/40 focus-visible:ring-2 ${
                activeTab === index
                  ? "gold-gradient text-dark shadow-[0_8px_24px_rgba(184,134,11,0.35)]"
                  : "border border-gold/15 bg-dark-secondary/70 text-slate-300 hover:border-gold/40 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-5"
            >
              {tab.kind === "single" && (
                <>
                  <div className="hidden md:block">
                    <WindowFrame active>
                      <img
                        src={tab.image}
                        alt={tab.label}
                        className="block w-full object-cover object-top"
                        loading="lazy"
                      />
                    </WindowFrame>
                  </div>
                  <MobileSimpleFrame active>
                    <img
                      src={tab.image}
                      alt={tab.label}
                      className="block w-full object-cover object-top"
                      loading="lazy"
                    />
                  </MobileSimpleFrame>
                </>
              )}

              {tab.kind === "carousel" && (
                <div className="space-y-4">
                  <div className="hidden md:block">
                    <WindowFrame active>
                      <div className="relative">
                        <img
                          src={carouselMeta.slide.image}
                          alt={`${tab.label} example ${slideIndex + 1}`}
                          className="block w-full object-cover object-top"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center bg-linear-to-r from-dark/70 to-transparent md:w-16" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-12 items-center justify-end bg-linear-to-l from-dark/70 to-transparent md:w-16" />
                        <div className="absolute inset-y-0 left-2 flex items-center md:left-4">
                          <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous chart screenshot"
                            className="pointer-events-auto rounded-full border border-gold/40 bg-dark/80 p-2 text-gold-light shadow-lg backdrop-blur transition hover:bg-gold/15"
                          >
                            <FiChevronLeft size={18} />
                          </button>
                        </div>
                        <div className="absolute inset-y-0 right-2 flex items-center md:right-4">
                          <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next chart screenshot"
                            className="pointer-events-auto rounded-full border border-gold/40 bg-dark/80 p-2 text-gold-light shadow-lg backdrop-blur transition hover:bg-gold/15"
                          >
                            <FiChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </WindowFrame>
                  </div>

                  <div className="md:hidden">
                    <MobileSimpleFrame active>
                      <div className="relative">
                        <img
                          src={carouselMeta.slide.image}
                          alt={`${tab.label} example ${slideIndex + 1}`}
                          className="block w-full object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute inset-y-0 left-2 flex items-center">
                          <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous chart screenshot"
                            className="rounded-full border border-gold/40 bg-dark/85 p-2 text-gold-light"
                          >
                            <FiChevronLeft size={18} />
                          </button>
                        </div>
                        <div className="absolute inset-y-0 right-2 flex items-center">
                          <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next chart screenshot"
                            className="rounded-full border border-gold/40 bg-dark/85 p-2 text-gold-light"
                          >
                            <FiChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </MobileSimpleFrame>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      {tab.slides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          type="button"
                          aria-label={`Go to slide ${dotIndex + 1} of ${tab.slides.length}`}
                          onClick={() => setSlideIndex(dotIndex)}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            dotIndex === slideIndex
                              ? "bg-gold-light shadow-[0_0_10px_rgba(255,215,0,0.55)]"
                              : "bg-slate-600 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      {slideIndex + 1} of {tab.slides.length}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 hidden flex-wrap justify-center gap-3 md:flex">
            {TABS.map((t, index) => (
              <button
                key={`thumb-${t.id}`}
                type="button"
                onClick={() => setActiveTab(index)}
                aria-label={`Show ${t.label}`}
                className={`relative overflow-hidden rounded-lg border transition ${
                  activeTab === index
                    ? "border-gold-light shadow-[0_0_18px_rgba(255,215,0,0.35)]"
                    : "border-gold/15 opacity-80 hover:border-gold/40 hover:opacity-100"
                }`}
              >
                <img
                  src={t.thumbnail}
                  alt=""
                  className="h-16 w-28 object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-center">
            <p className="text-sm italic leading-relaxed text-slate-300 md:text-base">
              {captionText}
            </p>
            {noteText && (
              <p className="text-xs leading-relaxed text-[#c8ab64] md:text-sm">{noteText}</p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
