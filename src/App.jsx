import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './seo/SEOHead';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DownloadSection from "./components/DownloadSection";
import Footer from "./components/Footer";
import SharedChartPage from "./components/SharedChartPage";
import NotFound from "./components/NotFound";

// Lazy load heavy components for code splitting
const ChartsShowcase = lazy(() => import("./components/ChartsShowcase"));
const ChartTypesGallery = lazy(() => import("./components/ChartTypesGallery"));
const Screenshots = lazy(() => import("./components/Screenshots"));

// Loading fallback for lazy-loaded components
const ComponentLoader = () => (
  <div className="flex min-h-[400px] items-center justify-center bg-dark">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
  </div>
);

const LandingPage = () => (
  <>
    <SEOHead
      title="King Data Visualizer — Free Desktop Data Visualization App for Windows"
      description="Download King Data Visualizer — a free Windows desktop app by Jeme Beseka. Create interactive charts from CSV data. 10+ chart types: Bar, Line, Scatter, Pie, Radar, Heatmap and more. No account required."
      url="https://king-datavisualizer.netlify.app"
      image="https://king-datavisualizer.netlify.app/og-image.png"
    />
    <div className="relative min-h-screen overflow-hidden bg-dark text-white">
      <div className="ambient-radial-overlay pointer-events-none absolute inset-0 z-0" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <section id="hero" className="-mb-16 relative z-10" role="region" aria-labelledby="hero-heading">
            <Hero />
          </section>
          <section id="charts-showcase" className="-mt-16 relative z-20" role="region" aria-labelledby="charts-showcase-heading">
            <Suspense fallback={<ComponentLoader />}>
              <ChartsShowcase />
            </Suspense>
          </section>
          <section id="features" className="-mt-16 relative z-30" role="region" aria-labelledby="features-heading">
            <Features />
          </section>
          <section id="chart-types" className="-mt-16 relative z-40" role="region" aria-labelledby="chart-types-heading">
            <Suspense fallback={<ComponentLoader />}>
              <ChartTypesGallery />
            </Suspense>
          </section>
          <section id="how-it-works" className="-mt-16 relative z-50" role="region" aria-labelledby="how-it-works-heading">
            <HowItWorks />
          </section>
          <section id="screenshots" className="-mt-16 relative z-60" role="region" aria-labelledby="screenshots-heading">
            <Suspense fallback={<ComponentLoader />}>
              <Screenshots />
            </Suspense>
          </section>
          <section id="download" className="-mt-16 relative z-70" role="region" aria-labelledby="download-heading">
            <DownloadSection />
          </section>
        </main>
        <footer id="footer" className="-mt-16 relative z-80">
          <Footer />
        </footer>
      </div>
    </div>
  </>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgressBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/share/:shareId" element={<SharedChartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
