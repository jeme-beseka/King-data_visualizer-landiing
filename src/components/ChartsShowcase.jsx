import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const lineData = [
  { month: "Jan", alpha: 42, omega: 31, nova: 27 },
  { month: "Feb", alpha: 45, omega: 35, nova: 30 },
  { month: "Mar", alpha: 49, omega: 36, nova: 31 },
  { month: "Apr", alpha: 54, omega: 41, nova: 34 },
  { month: "May", alpha: 56, omega: 45, nova: 36 },
  { month: "Jun", alpha: 61, omega: 47, nova: 39 },
  { month: "Jul", alpha: 64, omega: 50, nova: 42 },
  { month: "Aug", alpha: 66, omega: 52, nova: 43 },
  { month: "Sep", alpha: 68, omega: 55, nova: 45 },
  { month: "Oct", alpha: 72, omega: 58, nova: 49 },
  { month: "Nov", alpha: 75, omega: 62, nova: 51 },
  { month: "Dec", alpha: 79, omega: 66, nova: 54 },
];

const barData = [
  { region: "North", revenue: 820 },
  { region: "West", revenue: 740 },
  { region: "South", revenue: 680 },
  { region: "East", revenue: 720 },
  { region: "Central", revenue: 760 },
];

const barColors = ["#FFD700", "#B8860B", "#7C4DFF", "#00B4D8", "#56C596"];

const scatterA = [
  { x: 12, y: 28, z: 8 },
  { x: 18, y: 34, z: 10 },
  { x: 22, y: 39, z: 11 },
  { x: 26, y: 43, z: 9 },
  { x: 29, y: 49, z: 12 },
];

const scatterB = [
  { x: 14, y: 19, z: 7 },
  { x: 19, y: 23, z: 9 },
  { x: 24, y: 29, z: 10 },
  { x: 28, y: 35, z: 11 },
  { x: 31, y: 38, z: 9 },
];

const scatterC = [
  { x: 10, y: 42, z: 8 },
  { x: 16, y: 48, z: 10 },
  { x: 21, y: 53, z: 12 },
  { x: 27, y: 59, z: 13 },
  { x: 33, y: 66, z: 12 },
];

const radarData = [
  { metric: "Speed", actual: 89, benchmark: 74 },
  { metric: "Accuracy", actual: 94, benchmark: 81 },
  { metric: "Scalability", actual: 86, benchmark: 76 },
  { metric: "UX", actual: 91, benchmark: 79 },
  { metric: "Reliability", actual: 95, benchmark: 83 },
  { metric: "Insights", actual: 90, benchmark: 78 },
];

const tooltipStyle = {
  backgroundColor: "rgba(13, 13, 26, 0.96)",
  border: "1px solid rgba(255, 215, 0, 0.3)",
  borderRadius: "10px",
  color: "#FFD700",
  boxShadow: "0 16px 30px rgba(0,0,0,0.35)",
};

const cardBaseClass =
  "group relative rounded-2xl border border-gold/15 bg-dark-secondary/45 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-gold/75 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]";

const sectionTitleClass = "font-display text-3xl text-white md:text-4xl";

const motionSettings = {
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, ease: "easeOut" },
};

const ChartCardHeader = ({ title, kpi }) => (
  <div className="mb-4 flex items-start justify-between gap-4">
    <h3 className="font-display text-lg text-gold-light">{title}</h3>
    <span className="rounded-full border border-gold/30 bg-dark/70 px-2.5 py-1 text-[11px] text-[#d8bc75]">
      {kpi}
    </span>
  </div>
);

const ChartsShowcase = () => {
  const [lineKey, setLineKey] = useState(0);
  const [barKey, setBarKey] = useState(0);
  const [scatterKey, setScatterKey] = useState(0);
  const [radarKey, setRadarKey] = useState(0);

  const [lineVisible, setLineVisible] = useState({
    alpha: true,
    omega: true,
    nova: true,
  });

  const [lineRef, lineInView] = useInView({ triggerOnce: true, threshold: 0.22 });
  const [barRef, barInView] = useInView({ triggerOnce: true, threshold: 0.22 });
  const [scatterRef, scatterInView] = useInView({ triggerOnce: true, threshold: 0.22 });
  const [radarRef, radarInView] = useInView({ triggerOnce: true, threshold: 0.22 });

  const lineLegend = useMemo(
    () => [
      { label: "Product Alpha", key: "alpha", color: "#00B4D8" },
      { label: "Product Omega", key: "omega", color: "#FFD700" },
      { label: "Product Nova", key: "nova", color: "#56C596" },
    ],
    []
  );

  const toggleSeries = (key) => {
    setLineVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative overflow-hidden bg-dark px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[42px_42px] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,215,0,0.12),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(0,180,216,0.08),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 space-y-4 text-center">
          <h2 className={sectionTitleClass}>See Your Data Come Alive</h2>
          <div className="mx-auto h-1 w-32 rounded-full gold-gradient" />
          <p className="mx-auto max-w-3xl text-slate-300">
            From trends to correlations, explore every angle with animated, interactive charts
            designed to surface insight instantly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.article
            ref={lineRef}
            initial={{ opacity: 0, x: -60 }}
            animate={lineInView ? { opacity: 1, x: 0 } : {}}
            {...motionSettings}
            className={cardBaseClass}
            onMouseEnter={() => setLineKey((prev) => prev + 1)}
          >
            <ChartCardHeader title="Sales Trends" kpi="YoY +18%" />
            <div className="mb-4 flex flex-wrap gap-2">
              {lineLegend.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleSeries(item.key)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition ${
                    lineVisible[item.key]
                      ? "border-gold/45 bg-dark/85 text-slate-100"
                      : "border-slate-700 bg-dark/40 text-slate-500"
                  }`}
                >
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart key={lineKey} data={lineData} margin={{ top: 8, right: 12, left: -15, bottom: 4 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fill: "#9ea5bc", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ea5bc", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: "#d7d9e0", fontSize: "12px" }} />
                  {lineVisible.alpha && (
                    <Line
                      type="monotone"
                      dataKey="alpha"
                      stroke="#00B4D8"
                      strokeWidth={2.3}
                      dot={false}
                      isAnimationActive
                      animationDuration={520}
                    />
                  )}
                  {lineVisible.omega && (
                    <Line
                      type="monotone"
                      dataKey="omega"
                      stroke="#FFD700"
                      strokeWidth={2.6}
                      dot={false}
                      isAnimationActive
                      animationDuration={520}
                    />
                  )}
                  {lineVisible.nova && (
                    <Line
                      type="monotone"
                      dataKey="nova"
                      stroke="#56C596"
                      strokeWidth={2.2}
                      dot={false}
                      isAnimationActive
                      animationDuration={520}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          <motion.article
            ref={barRef}
            initial={{ opacity: 0, y: 70 }}
            animate={barInView ? { opacity: 1, y: 0 } : {}}
            {...motionSettings}
            transition={{ ...motionSettings.transition, delay: 0.12 }}
            className={cardBaseClass}
            onMouseEnter={() => setBarKey((prev) => prev + 1)}
          >
            <ChartCardHeader title="Revenue by Region" kpi="Top: North" />
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart key={barKey} data={barData} margin={{ top: 16, right: 12, left: -15, bottom: 4 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="region" tick={{ fill: "#9ea5bc", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ea5bc", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={700}>
                    {barData.map((entry, index) => (
                      <Cell
                        key={`${entry.region}-${index}`}
                        fill={barColors[index % barColors.length]}
                        className="origin-bottom transition-transform duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.35)]"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          <motion.article
            ref={scatterRef}
            initial={{ opacity: 0, x: 60 }}
            animate={scatterInView ? { opacity: 1, x: 0 } : {}}
            {...motionSettings}
            transition={{ ...motionSettings.transition, delay: 0.18 }}
            className={cardBaseClass}
            onMouseEnter={() => setScatterKey((prev) => prev + 1)}
          >
            <ChartCardHeader title="Correlation Analysis" kpi="r = 0.82" />
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart key={scatterKey} margin={{ top: 8, right: 14, left: -12, bottom: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="x"
                    name="Spend"
                    unit="%"
                    tick={{ fill: "#9ea5bc", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="y"
                    name="Returns"
                    unit="%"
                    tick={{ fill: "#9ea5bc", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ZAxis dataKey="z" range={[80, 380]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: "#d7d9e0", fontSize: "12px" }} />
                  <Scatter name="Retail" data={scatterA} fill="#FFD700" isAnimationActive animationDuration={600} />
                  <Scatter name="SaaS" data={scatterB} fill="#00B4D8" isAnimationActive animationDuration={700} />
                  <Scatter name="Enterprise" data={scatterC} fill="#56C596" isAnimationActive animationDuration={800} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          <motion.article
            ref={radarRef}
            initial={{ opacity: 0, y: 70 }}
            animate={radarInView ? { opacity: 1, y: 0 } : {}}
            {...motionSettings}
            transition={{ ...motionSettings.transition, delay: 0.24 }}
            className={cardBaseClass}
            onMouseEnter={() => setRadarKey((prev) => prev + 1)}
          >
            <ChartCardHeader title="Performance Metrics" kpi="Score 92/100" />
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart key={radarKey} data={radarData} outerRadius="76%">
                  <PolarGrid stroke="rgba(255,255,255,0.12)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#b6bdd0", fontSize: 12 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Radar
                    name="Actual"
                    dataKey="actual"
                    stroke="#FFD700"
                    fill="rgba(255, 215, 0, 0.35)"
                    fillOpacity={1}
                    isAnimationActive
                    animationDuration={700}
                  />
                  <Radar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="#00B4D8"
                    fill="rgba(0, 180, 216, 0.3)"
                    fillOpacity={1}
                    isAnimationActive
                    animationDuration={820}
                  />
                  <Legend wrapperStyle={{ color: "#d7d9e0", fontSize: "12px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default ChartsShowcase;
