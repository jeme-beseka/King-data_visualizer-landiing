import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const categories = ["Basic", "Statistical", "Advanced", "Financial"];

const chartDefinitions = [
  {
    id: "line-chart",
    name: "Line Chart",
    category: "Basic",
    bestFor: "Trends over time",
    implemented: true,
    description: "Shows how values evolve across ordered categories or time.",
    Preview: PreviewLine,
  },
  {
    id: "bar-chart",
    name: "Bar Chart",
    category: "Basic",
    bestFor: "Comparing categories",
    implemented: true,
    description: "Compare magnitudes across discrete groups at a glance.",
    Preview: PreviewBar,
  },
  {
    id: "scatter-plot",
    name: "Scatter Plot",
    category: "Basic",
    bestFor: "Relationships",
    implemented: true,
    description: "Reveal correlation and clusters between two numeric variables.",
    Preview: PreviewScatter,
  },
  {
    id: "area-chart",
    name: "Area Chart",
    category: "Basic",
    bestFor: "Volume over time",
    implemented: true,
    description: "Emphasize cumulative change or stacked contributions over time.",
    Preview: PreviewArea,
  },
  {
    id: "pie-chart",
    name: "Pie Chart",
    category: "Basic",
    bestFor: "Parts of a whole",
    implemented: true,
    description: "Show proportional breakdowns when few segments matter most.",
    Preview: PreviewPie,
  },
  {
    id: "histogram",
    name: "Histogram",
    category: "Statistical",
    bestFor: "Distributions",
    implemented: true,
    description: "Display frequency distributions across continuous buckets.",
    Preview: PreviewHistogram,
  },
  {
    id: "box-plot",
    name: "Box Plot",
    category: "Statistical",
    bestFor: "Quartiles & outliers",
    implemented: true,
    description: "Summarize median, spread, and outliers across groups.",
    Preview: PreviewBox,
  },
  {
    id: "bubble-chart",
    name: "Bubble Chart",
    category: "Advanced",
    bestFor: "Three dimensions",
    implemented: true,
    description: "Encode a third numeric dimension with point size alongside x and y.",
    Preview: PreviewBubble,
  },
  {
    id: "heatmap",
    name: "Heatmap",
    category: "Advanced",
    bestFor: "Matrix intensity",
    implemented: true,
    description: "Compare density or magnitude across two categorical axes.",
    Preview: PreviewHeatmap,
  },
  {
    id: "radar-chart",
    name: "Radar Chart",
    category: "Statistical",
    bestFor: "Multi-metric profiles",
    implemented: true,
    description: "Compare strengths across several metrics on a shared radial scale.",
    Preview: PreviewRadar,
  },
  {
    id: "radar-vs-average",
    name: "Radar vs Average",
    category: "Statistical",
    bestFor: "Benchmarking",
    implemented: true,
    description: "Overlay your profile against an average baseline in one glance.",
    Preview: PreviewRadarAvg,
  },
  {
    id: "treemap",
    name: "Treemap",
    category: "Advanced",
    bestFor: "Hierarchical proportion",
    implemented: false,
    description: "Show nested categories as nested rectangles sized by contribution.",
    Preview: PreviewTreemap,
  },
  {
    id: "sunburst",
    name: "Sunburst",
    category: "Advanced",
    bestFor: "Radial hierarchy",
    implemented: false,
    description: "Explore multi-level hierarchies as concentric arcs.",
    Preview: PreviewSunburst,
  },
  {
    id: "funnel-chart",
    name: "Funnel Chart",
    category: "Financial",
    bestFor: "Conversion stages",
    implemented: false,
    description: "Visualize sequential drop-offs from leads to completions.",
    Preview: PreviewFunnel,
  },
  {
    id: "waterfall-chart",
    name: "Waterfall Chart",
    category: "Financial",
    bestFor: "Running totals",
    implemented: false,
    description: "Bridge individual gains and losses to a final stacked total.",
    Preview: PreviewWaterfall,
  },
  {
    id: "gantt-chart",
    name: "Gantt Chart",
    category: "Financial",
    bestFor: "Scheduling",
    implemented: false,
    description: "Plan tasks, durations, and dependencies across a timeline.",
    Preview: PreviewGantt,
  },
  {
    id: "violin-plot",
    name: "Violin Plot",
    category: "Statistical",
    bestFor: "Density by group",
    implemented: false,
    description: "Combine box-style summary with full distribution density curves.",
    Preview: PreviewViolin,
  },
  {
    id: "word-cloud",
    name: "Word Cloud",
    category: "Advanced",
    bestFor: "Text frequency",
    implemented: false,
    description: "Surface dominant terms sized by prominence in unstructured text.",
    Preview: PreviewWordCloud,
  },
  {
    id: "sankey-diagram",
    name: "Sankey Diagram",
    category: "Advanced",
    bestFor: "Flows & allocation",
    implemented: false,
    description: "Trace how quantities split and merge across stages or pathways.",
    Preview: PreviewSankey,
  },
  {
    id: "choropleth-map",
    name: "Choropleth Map",
    category: "Advanced",
    bestFor: "Geo comparison",
    implemented: false,
    description: "Color regions by a metric for geographic storytelling.",
    Preview: PreviewChoropleth,
  },
  {
    id: "candlestick-chart",
    name: "Candlestick Chart",
    category: "Financial",
    bestFor: "OHLC price",
    implemented: false,
    description: "Plot open-high-low-close patterns for volatile time series.",
    Preview: PreviewCandlestick,
  },
];

function PreviewLine() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <polyline fill="none" stroke="#FFD700" strokeWidth="2" points="10,42 35,28 58,38 82,14 106,26" />
    </svg>
  );
}

function PreviewBar() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {[28, 18, 40, 32, 24].map((h, i) => (
        <rect key={i} x={16 + i * 22} y={54 - h} width="14" height={h} fill="#B8860B" rx="2" />
      ))}
    </svg>
  );
}

function PreviewScatter() {
  const pts = [
    [22, 40],
    [38, 24],
    [52, 36],
    [68, 18],
    [88, 32],
    [96, 20],
  ];
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#00B4D8" />
      ))}
    </svg>
  );
}

function PreviewArea() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <path
        fill="rgba(255,215,0,0.35)"
        stroke="#FFD700"
        strokeWidth="1.5"
        d="M10 42 L34 26 L56 38 L82 14 L106 28 L106 54 L10 54 Z"
      />
    </svg>
  );
}

function PreviewPie() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <circle cx="60" cy="32" r="22" fill="#2D2D44" stroke="#FFD700" strokeWidth="1" />
      <path d="M60 32 L60 10 A22 22 0 0 1 76 52 Z" fill="#B8860B" />
      <path d="M60 32 L76 52 A22 22 0 0 1 48 54 Z" fill="#FFD700" />
    </svg>
  );
}

function PreviewHistogram() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {[42, 30, 18, 24, 32, 20, 12].map((h, i) => (
        <rect key={i} x={12 + i * 14} y={54 - h} width="11" height={h} fill="#56C596" opacity="0.9" rx="1" />
      ))}
    </svg>
  );
}

function PreviewBox() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <rect x="36" y="18" width="48" height="28" fill="none" stroke="#FFD700" strokeWidth="1.5" rx="2" />
      <line x1="20" x2="100" y1="30" y2="30" stroke="#8f94aa" strokeDasharray="2 2" />
      <rect x="48" y="24" width="24" height="16" fill="rgba(255,215,0,0.25)" rx="2" />
    </svg>
  );
}

function PreviewBubble() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <circle cx="32" cy="38" r="10" fill="rgba(255,215,0,0.55)" stroke="#FFD700" />
      <circle cx="60" cy="24" r="16" fill="rgba(0,180,216,0.45)" stroke="#00B4D8" />
      <circle cx="88" cy="40" r="8" fill="rgba(184,134,11,0.6)" stroke="#B8860B" />
    </svg>
  );
}

function PreviewHeatmap() {
  const colors = ["#FFD700", "#B8860B", "#2D2D44", "#56C596", "#B8860B", "#FFD700", "#00B4D8"];
  let idx = 0;
  const cells = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 5; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={22 + c * 16}
          y={14 + r * 14}
          width={14}
          height={12}
          fill={colors[idx++ % colors.length]}
          opacity={0.7}
          rx="2"
        />
      );
    }
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {cells}
    </svg>
  );
}

function PreviewRadar() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <polygon
        fill="rgba(255,215,0,0.35)"
        stroke="#FFD700"
        strokeWidth="1.5"
        points="60,12 90,42 74,54 46,54 28,42"
      />
      <polygon fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" points="60,12 90,42 74,54 46,54 28,42" />
    </svg>
  );
}

function PreviewRadarAvg() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <polygon
        fill="none"
        stroke="rgba(0,180,216,0.85)"
        strokeWidth="2"
        points="60,18 82,42 66,52 54,52 38,42"
      />
      <polygon
        fill="rgba(255,215,0,0.3)"
        stroke="#FFD700"
        strokeWidth="1.5"
        points="60,14 88,44 72,56 44,54 34,46"
      />
    </svg>
  );
}

function PreviewTreemap() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <rect x="12" y="12" width="56" height="40" fill="#FFD700" opacity="0.35" rx="2" stroke="#FFD700" />
      <rect x="70" y="12" width="38" height="18" fill="#00B4D8" opacity="0.4" rx="2" stroke="#00B4D8" />
      <rect x="70" y="32" width="38" height="20" fill="#B8860B" opacity="0.4" rx="2" stroke="#B8860B" />
    </svg>
  );
}

function PreviewSunburst() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <path
        fill="rgba(255,215,0,0.45)"
        d="M60 16 A26 26 0 1 1 59.9 16 L60 32 A10 10 0 1 0 60 42 Z"
        stroke="#FFD700"
      />
      <path fill="rgba(0,180,216,0.35)" d="M60 42 A22 22 0 1 1 82 54 L70 42 A10 10 0 0 0 60 52 Z" stroke="#00B4D8" />
    </svg>
  );
}

function PreviewFunnel() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <polygon fill="rgba(255,215,0,0.45)" stroke="#FFD700" points="20,14 100,14 88,28 28,28" />
      <polygon fill="rgba(184,134,11,0.5)" stroke="#B8860B" points="28,34 92,34 82,46 38,46" />
      <polygon fill="rgba(255,215,0,0.55)" stroke="#FFD700" points="40,52 82,52 74,62 46,62" />
    </svg>
  );
}

function PreviewWaterfall() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <rect x="18" y="28" width="14" height="22" fill="#56C596" rx="2" />
      <rect x="38" y="36" width="14" height="14" fill="#FFD700" rx="2" opacity="0.9" />
      <rect x="58" y="40" width="14" height="10" fill="#FFD700" opacity="0.5" rx="2" />
      <rect x="78" y="18" width="14" height="32" fill="#B8860B" rx="2" />
    </svg>
  );
}

function PreviewGantt() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <rect x="18" y="18" width="70" height="8" fill="rgba(255,215,0,0.35)" rx="2" stroke="#FFD700" />
      <rect x="32" y="32" width="56" height="8" fill="rgba(184,134,11,0.55)" rx="2" stroke="#B8860B" />
      <rect x="24" y="46" width="48" height="8" fill="rgba(255,215,0,0.25)" rx="2" stroke="#FFD700" />
    </svg>
  );
}

function PreviewViolin() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <ellipse cx="54" cy="32" rx="18" ry="22" fill="rgba(255,215,0,0.15)" stroke="#FFD700" />
      <line x1="54" x2="54" y1="18" y2="46" stroke="#FFD700" strokeWidth="2" />
      <ellipse cx="70" cy="32" rx="14" ry="20" fill="rgba(0,180,216,0.18)" stroke="#00B4D8" />
    </svg>
  );
}

function PreviewWordCloud() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <text x="18" y="28" fill="#FFD700" fontSize="14" fontFamily="sans-serif">
        Viz
      </text>
      <text x="58" y="22" fill="#B8860B" fontSize="10" fontFamily="sans-serif">
        Insight
      </text>
      <text x="32" y="48" fill="#8f94aa" fontSize="12" fontFamily="sans-serif">
        Data
      </text>
      <text x="72" y="44" fill="#56C596" fontSize="9" fontFamily="sans-serif">
        Signal
      </text>
    </svg>
  );
}

function PreviewSankey() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <path d="M20 14 C50 14 44 54 104 54" fill="none" stroke="rgba(255,215,0,0.45)" strokeWidth="10" />
      <path d="M20 50 C54 42 76 34 104 26" fill="none" stroke="rgba(0,180,216,0.38)" strokeWidth="10" />
    </svg>
  );
}

function PreviewChoropleth() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <polygon fill="#B8860B" opacity="0.85" stroke="#FFD700" points="18,42 54,22 94,42 54,54" />
      <polygon fill="#FFD700" opacity="0.4" stroke="#FFD700" points="34,52 74,52 92,54 28,54" />
    </svg>
  );
}

function PreviewCandlestick() {
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {[24, 48, 72].map((x, i) => (
        <g key={i}>
          <line x1={x} x2={x} y1={16 + i * 10} y2={48 + i * 4} stroke="#8f94aa" strokeWidth="1.5" />
          <rect
            x={x - 8}
            y={22 + i * 14}
            width="16"
            height={i % 2 ? 14 : 10}
            fill={i % 2 ? "#56C596" : "#FFD700"}
            rx="1"
          />
        </g>
      ))}
    </svg>
  );
}

const ChartTypesGallery = () => {
  const shouldReduceMotion = useReducedMotion();
  const pillsRef = useRef(null);
  const cardRefs = useRef({});
  const [scrollPct, setScrollPct] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [highlightedId, setHighlightedId] = useState(null);

  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -5% 0px",
  });

  const pillsScroll = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max <= 0 ? 1 : Math.min(1, Math.max(0, el.scrollLeft / max));
    setScrollPct(pct);
  }, []);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    pillsScroll();
    el.addEventListener("scroll", pillsScroll);
    window.addEventListener("resize", pillsScroll);
    return () => {
      el.removeEventListener("scroll", pillsScroll);
      window.removeEventListener("resize", pillsScroll);
    };
  }, [pillsScroll]);

  const matchesFilters = useCallback(
    (c) => {
      const catOk = categoryFilter === "All" || c.category === categoryFilter;
      const availOk =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && c.implemented) ||
        (availabilityFilter === "upcoming" && !c.implemented);
      return catOk && availOk;
    },
    [categoryFilter, availabilityFilter]
  );

  const filteredCharts = useMemo(
    () => chartDefinitions.filter(matchesFilters),
    [matchesFilters]
  );

  const scrollCardIntoView = (id) => {
    const node = cardRefs.current[id];
    if (node) {
      node.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }
  };

  const onPillClick = (chart) => {
    setHighlightedId(chart.id);
    if (!matchesFilters(chart)) {
      setCategoryFilter("All");
      setAvailabilityFilter("all");
      window.setTimeout(() => scrollCardIntoView(chart.id), 120);
    } else {
      scrollCardIntoView(chart.id);
    }
  };

  useEffect(() => {
    if (!highlightedId) return;
    const timer = window.setTimeout(() => setHighlightedId(null), 2200);
    return () => clearTimeout(timer);
  }, [highlightedId]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-gold/10 bg-dark px-6 py-24"
      aria-labelledby="chart-types-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[36px_36px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8ab64]">
            Supported types catalog
          </p>
          <h2
            id="chart-types-heading"
            className="font-display bg-linear-to-r from-white via-gold-light to-gold bg-clip-text text-3xl text-transparent md:text-4xl"
          >
            King Data Visualizer — 20+ Chart Types
          </h2>
          <div className="gold-gradient mx-auto h-1 w-36 rounded-full" />
          <p className="mx-auto max-w-2xl text-slate-300">
            King Data Visualizer supports over 20 chart types, making it the most versatile free desktop data visualization tool for Windows.
          </p>

          <div
            className="mx-auto flex flex-wrap justify-center gap-2 pt-4"
            role="group"
            aria-label="Legend: availability"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-dark-secondary/70 px-3 py-1.5 text-xs text-slate-200">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFD700]" aria-hidden />
              Available now (desktop)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-gold/25 bg-dark-secondary/50 px-3 py-1.5 text-xs text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-gold/40 opacity-70" aria-hidden />
              Coming soon (web app)
            </span>
          </div>
        </div>

        <div
          className="mb-3 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={categoryFilter === cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition outline-none ring-gold-light/40 focus-visible:ring-2 ${
                categoryFilter === cat
                  ? "border-gold bg-gold/15 text-gold-light"
                  : "border-gold/20 bg-dark-secondary/55 text-slate-300 hover:border-gold/50"
              }`}
            >
              {cat === "All" ? "Category: All" : cat}
            </button>
          ))}
        </div>

        <div
          className="mb-2 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter by availability"
        >
          {[
            { key: "all", label: "All availability" },
            { key: "available", label: "Available now" },
            { key: "upcoming", label: "Coming soon" },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setAvailabilityFilter(key)}
              aria-pressed={availabilityFilter === key}
              className={`rounded-full border px-3 py-1 text-[11px] transition outline-none ring-gold-light/40 focus-visible:ring-2 ${
                availabilityFilter === key
                  ? "border-gold-light/70 bg-dark-secondary/85 text-white"
                  : "border-transparent text-slate-400 underline-offset-2 hover:text-gold-light"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div
            ref={pillsRef}
            className="flex gap-2 overflow-x-auto pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="listbox"
            aria-label="Chart type shortcuts"
          >
            {chartDefinitions.map((chart) => (
              <button
                key={chart.id}
                type="button"
                role="option"
                aria-selected={highlightedId === chart.id}
                onClick={() => onPillClick(chart)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium whitespace-nowrap transition outline-none ring-gold-light/40 focus-visible:ring-2 ${
                  chart.implemented
                    ? "border-gold/30 bg-dark-secondary/70 text-slate-100 hover:border-gold/60 hover:bg-dark-secondary"
                    : "border-dashed border-gold/20 bg-dark-secondary/35 text-slate-400 hover:border-gold/40"
                } ${highlightedId === chart.id ? "ring-2 ring-gold-light/55" : ""}`}
              >
                <span>{chart.name}</span>
                {!chart.implemented && (
                  <span className="rounded-full bg-dark/70 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-[#baa56a]">
                    Web
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mb-10 space-y-1">
            <div className="h-1 overflow-hidden rounded-full bg-dark-secondary/80">
              <div
                className="gold-gradient h-full rounded-full transition-[width] duration-150"
                style={{ width: `${Math.max(4, scrollPct * 100)}%` }}
                aria-hidden
              />
            </div>
            <p className="text-center text-[10px] text-slate-500">
              Horizontal scroll indicator
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCharts.map((chart, index) => {
            const Preview = chart.Preview;
            const focused = highlightedId === chart.id;
            return (
              <motion.article
                key={chart.id}
                ref={(el) => {
                  cardRefs.current[chart.id] = el;
                }}
                layout
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.52,
                  delay: shouldReduceMotion ? 0 : Math.floor(index / 3) * 0.08 + (index % 3) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                tabIndex={0}
                className={`glass flex min-h-[220px] flex-col rounded-2xl p-5 transition-[transform,border-color,opacity] outline-none duration-300 focus-visible:ring-2 focus-visible:ring-gold-light/55 ${
                  chart.implemented
                    ? focused
                      ? "scale-[1.02] border-gold brightness-105"
                      : "border-gold/20 hover:border-gold/65 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.35)]"
                    : `opacity-65 grayscale-[0.35] ${focused ? "opacity-95 ring-1 ring-gold/30" : "border-gold/10 hover:border-gold/30"} hover:-translate-y-0.5`
                } ${focused ? "ring-2 ring-gold-light/55" : ""}`}
              >
                <div className="mb-4 flex shrink-0 items-start justify-between gap-2 border-b border-gold/10 pb-4">
                  <h3 className="font-display text-lg text-white">{chart.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      chart.implemented
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : "border border-dashed border-gold/30 bg-dark/70 text-[#bba46a]"
                    }`}
                  >
                    {chart.implemented ? "Desktop" : "Web soon"}
                  </span>
                </div>

                <div
                  className={`mb-3 flex shrink-0 items-center justify-center rounded-xl border px-3 py-2 ${
                    chart.implemented ? "border-gold/15 bg-dark/40" : "border-gold/10 bg-dark/25"
                  }`}
                >
                  <Preview />
                </div>

                <p className="mb-2 shrink-0 text-xs text-[#baa56a]/90">
                  Best for {chart.bestFor}
                </p>
                <p className="grow text-sm leading-relaxed text-slate-400">
                  {!chart.implemented && (
                    <span className="mb-2 block rounded-md border border-dashed border-gold/25 bg-dark/45 px-2 py-1 text-[11px] text-[#9a8f7a]">
                      Planned for the upcoming web release.
                    </span>
                  )}
                  {chart.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {filteredCharts.length === 0 && (
          <p className="py-10 text-center text-slate-500">
            No chart types match the current filters. Reset filters above.
          </p>
        )}
      </div>
    </section>
  );
};

export default ChartTypesGallery;
