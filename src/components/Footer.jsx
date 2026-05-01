import { useState, useEffect, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-scroll';
import { RiArrowUpLine, RiGithubFill, RiTwitterXLine, RiLinkedinFill, RiMailLine, RiHeartFill } from 'react-icons/ri';
import logo from '../assets/logo.png';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
      }, 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const navLinks = [
    { name: 'Features', to: 'features' },
    { name: 'Chart Types', to: 'chart-types' },
    { name: 'How It Works', to: 'how-it-works' },
    { name: 'Screenshots', to: 'screenshots' },
    { name: 'Download', to: 'download' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: RiGithubFill, href: 'https://github.com/jeme-beseka/Data_Visualization_Desktop', aria: 'GitHub Repository' },
    { name: 'Twitter', icon: RiTwitterXLine, href: 'https://x.com/king_jaysheval', aria: 'Twitter Profile' },
    { name: 'LinkedIn', icon: RiLinkedinFill, href: 'https://linkedin.com/in/jemebeseka', aria: 'LinkedIn Profile' },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0D0D1A] rounded-full shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A]"
          aria-label="Scroll to top"
        >
          <RiArrowUpLine className="w-5 h-5" />
        </motion.button>
      )}

      <footer 
        className="relative bg-[#0D0D1A] backdrop-blur-sm"
        style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #1a1a2e 100%)' }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="px-6 py-12 md:py-16"
        >
          <div className="mx-auto max-w-6xl">
            {/* Main Content - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
              
              {/* Left Column - Branding */}
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-3"
                >
                  <img 
                    src={logo} 
                    alt="King Data Visualizer Logo" 
                    className="w-10 h-10 rounded-lg shadow-lg shadow-amber-500/20"
                  />
                  <h3 className="text-xl font-['Orbitron'] font-bold text-amber-400">
                    King Data Visualizer
                  </h3>
                </motion.div>
                
                <address className="not-italic">
                  <p className="text-slate-400 text-sm mb-2">
                    Built by Jeme Beseka
                  </p>
                  <a 
                    href="mailto:j.beseka@gmail.com"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A] rounded"
                    aria-label="Send email to j.beseka@gmail.com"
                  >
                    <RiMailLine className="w-4 h-4" />
                    <span className="text-sm hover:underline">j.beseka@gmail.com</span>
                  </a>
                </address>
                
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-400 font-medium">
                    v3.3 — April 2026
                  </span>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4 pt-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.aria}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-slate-800/50 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A]"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Center Column - Navigation */}
              <div className="space-y-4">
                <h3 className="text-lg font-['Orbitron'] font-bold text-white mb-4">
                  Navigation
                </h3>
                
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="block text-slate-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A] rounded"
                        aria-label={`Navigate to ${link.name}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  
                  <li>
                    <span className="inline-flex items-center gap-2 text-slate-500 cursor-not-allowed">
                      Try Web App
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                        Coming Soon
                      </span>
                    </span>
                  </li>
                </ul>

                {/* Newsletter Signup */}
                <div className="pt-6">
                  <h4 className="text-sm font-semibold text-white mb-6 pb-4">Stay Updated</h4>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                        aria-label="Email for newsletter"
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0D0D1A] font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A]"
                        aria-label="Subscribe to newsletter"
                      >
                        Subscribe
                      </button>
                    </div>
                    {subscribed && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-400 text-sm"
                      >
                        ✓ Subscribed successfully!
                      </motion.p>
                    )}
                  </form>
                </div>
              </div>

              {/* Right Column - About */}
              <div className="space-y-4">
                <h3 className="text-lg font-['Orbitron'] font-bold text-white mb-4">
                  About
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  King Data Visualizer is a free, open-source desktop application for creating interactive data visualizations from CSV files or manual data entry.
                </p>
                
                <div className="pt-4 space-y-2">
                  <p className="text-slate-500 text-xs">
                    Built with:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                      JavaFX
                    </span>
                    <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                      Java 17
                    </span>
                    <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                      Maven
                    </span>
                  </div>
                </div>

                {/* Legal Links */}
                <div className="pt-4 flex gap-4 text-sm">
                  <a 
                    href="#privacy" 
                    className="text-slate-500 hover:text-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A] rounded"
                    aria-label="View Privacy Policy"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="#terms" 
                    className="text-slate-500 hover:text-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0D0D1A] rounded"
                    aria-label="View Terms of Service"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-amber-500/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">
                  © {currentYear} Jeme Beseka. King Data Visualizer is a free and open-source data visualization desktop application.
                </p>
                
                <motion.div 
                  className="flex items-center gap-2 text-slate-500 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Made with</span>
                  <RiHeartFill className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>for data.</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
};

export default memo(Footer);
