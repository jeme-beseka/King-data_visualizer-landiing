import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChartsShowcase from "./components/ChartsShowcase";
import Features from "./components/Features";
import ChartTypesGallery from "./components/ChartTypesGallery";
import HowItWorks from "./components/HowItWorks";
import Screenshots from "./components/Screenshots";
import DownloadSection from "./components/DownloadSection";
import Footer from "./components/Footer";

function App() {
  return (
    <ErrorBoundary>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgressBar />
      <div className="relative min-h-screen overflow-hidden bg-dark text-white">
        <div className="ambient-radial-overlay pointer-events-none absolute inset-0 z-0" />
        <div className="relative z-10">
          <Navbar />
          <main>
            <section id="hero" className="-mb-16 relative z-10">
              <Hero />
            </section>
            <section id="charts-showcase" className="-mt-16 relative z-20">
              <ChartsShowcase />
            </section>
            <section id="features" className="-mt-16 relative z-30">
              <Features />
            </section>
            <section id="chart-types" className="-mt-16 relative z-40">
              <ChartTypesGallery />
            </section>
            <section id="how-it-works" className="-mt-16 relative z-50">
              <HowItWorks />
            </section>
            <section id="screenshots" className="-mt-16 relative z-60">
              <Screenshots />
            </section>
            <section className="-mt-16 relative z-70">
              <DownloadSection />
            </section>
          </main>
          <footer id="footer" className="-mt-16 relative z-80">
            <Footer />
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
