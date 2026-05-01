import { useEffect, useState, memo } from "react";
import { Link } from "react-scroll";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../assets/logo.png';

const navLinks = [
  { label: "Features", to: "features" },
  { label: "Chart Types", to: "chart-types" },
  { label: "How It Works", to: "how-it-works" },
  { label: "Screenshots", to: "screenshots" },
  { label: "Download", to: "download" },
];

const linkBaseClass =
  "relative cursor-pointer pb-1 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-gold-light after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gold-light after:transition-transform after:duration-300 hover:after:scale-x-100";

const linkActiveClass = "!text-gold-light after:scale-x-100";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    const onScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 24);
      }, 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b px-4 py-3 transition-all duration-300 md:px-8 ${
        isScrolled
          ? "border-gold/25 bg-dark-secondary/88 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-gold/10 bg-dark/55 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link
          to="hero"
          spy
          smooth
          offset={-80}
          duration={550}
          className="flex cursor-pointer items-center gap-3"
        >
          <img
            src={logo}
            alt="King Data Visualizer logo"
            className="h-9 w-9 rounded-md border border-gold/35 object-cover"
            loading="lazy"
          />
          <span className="font-display text-sm text-gold-light md:text-base">
            King Data Visualizer
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy
              smooth
              offset={-80}
              duration={550}
              activeClass={linkActiveClass}
              className={linkBaseClass}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            type="button"
            className="relative rounded-lg border border-gold px-5 py-2 text-sm font-semibold text-gold-light transition-all duration-300 hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
          >
            Try Web App
            <span className="absolute -right-2 -top-2 rounded-full border border-gold/30 bg-[#8a6a1e] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-[#f7dda0]">
              Coming Soon
            </span>
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="inline-flex rounded-md border border-gold/40 p-2 text-gold-light transition hover:bg-gold/10 md:hidden"
        >
          {isMobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="mx-auto mt-3 max-w-7xl rounded-xl border border-gold/20 bg-dark-secondary/90 p-4 backdrop-blur-lg">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    spy
                    smooth
                    offset={-80}
                    duration={550}
                    activeClass="text-gold-light"
                    onClick={closeMobileMenu}
                    className="cursor-pointer rounded-md px-2 py-2 text-sm text-slate-200 transition hover:bg-gold/10 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  className="relative mt-1 rounded-lg border border-gold px-4 py-2 text-sm font-semibold text-gold-light"
                >
                  Try Web App
                  <span className="absolute -right-2 -top-2 rounded-full border border-gold/30 bg-[#8a6a1e] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-[#f7dda0]">
                    Coming Soon
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
};

export default memo(Navbar);
