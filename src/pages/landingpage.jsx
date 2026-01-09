
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  prefix: PropTypes.string
};

// Floating Particle Component
const FloatingParticle = ({ delay = 0, size = 4, duration = 20 }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
    style={{ width: size, height: size }}
    animate={{
      y: [-20, -100, -20],
      x: [0, 30, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

FloatingParticle.propTypes = {
  delay: PropTypes.number,
  size: PropTypes.number,
  duration: PropTypes.number
};

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const portfolioCompanies = [
    {
      name: "ShadowChain",
      tagline: "Mirror Your Web2 Activity on Web3",
      description: "A revolutionary blockchain platform that bridges the gap between Web2 and Web3. ShadowChain creates a private, secure blockchain mirror of your digital activity, giving users true ownership and privacy of their data.",
      url: "https://shadowchain.locsafe.org",
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      bgGlow: "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M24 4V44" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M4 14L44 34" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          <path d="M44 14L4 34" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      features: ["Private Blockchain", "Web2/Web3 Bridge", "Data Sovereignty", "Decentralized Identity"],
      category: "Blockchain Infrastructure"
    },
    {
      name: "FixFlow",
      tagline: "Fix Bugs, Get Paid Instantly",
      description: "An AI-powered automated bug bounty platform that revolutionizes how developers get compensated. When CI tests fail, bounties are created automatically. Fix the bug, get paid in stablecoin the moment your PR is merged.",
      url: "https://fixflow.locsafe.org",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgGlow: "from-amber-500/20 via-orange-500/20 to-red-500/20",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 18V30M18 24H30" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      features: ["Instant Payments", "Zero Platform Fees", "GitHub Integration", "Auto Bounty Escalation"],
      category: "AI-Powered DevTools"
    }
  ];

  const focusAreas = [
    {
      title: "Artificial Intelligence",
      description: "Investing in transformative AI technologies that automate workflows, enhance decision-making, and create new possibilities across industries.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
          <circle cx="16" cy="16" r="4" fill="currentColor"/>
          <path d="M16 4V8M16 24V28M4 16H8M24 16H28M7.5 7.5L10.5 10.5M21.5 21.5L24.5 24.5M7.5 24.5L10.5 21.5M21.5 10.5L24.5 7.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Blockchain Technology",
      description: "Building the decentralized infrastructure of tomorrow through innovative blockchain solutions that prioritize security, scalability, and user sovereignty.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M14 9H18M14 23H18M9 14V18M23 14V18" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      gradient: "from-purple-500 to-violet-500"
    },
    {
      title: "Developer Tools",
      description: "Empowering developers with next-generation tools that streamline workflows, improve code quality, and accelerate the path from idea to production.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L4 16L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 12L28 16L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 8L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "FinTech Innovation",
      description: "Reimagining financial services through technology that makes transactions faster, more accessible, and more equitable for everyone.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 8V24M12 12H20M12 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const stats = [
    { value: 2, suffix: "", label: "Portfolio Companies" },
    { value: 50, suffix: "M+", prefix: "$", label: "Combined Valuation" },
    { value: 100, suffix: "K+", label: "Users Served" },
    { value: 15, suffix: "+", label: "Countries Reached" }
  ];

  return (
    <main className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden" role="main">
      <Helmet>
        <title>Locsafe Ventures | AI & Blockchain Technology Holdings</title>
        <meta
          name="description"
          content="Locsafe Ventures is a technology holding company focused on AI and blockchain innovations. Discover our portfolio companies: ShadowChain and FixFlow."
        />
        <meta name="keywords" content="technology holding company, AI investments, blockchain technology, venture capital, ShadowChain, FixFlow, Web3, developer tools" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/" />
        <meta property="og:title" content="Locsafe Ventures | AI & Blockchain Technology Holdings" />
        <meta property="og:description" content="Building the future through AI and blockchain innovation. Explore our portfolio of transformative technology companies." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Locsafe Ventures | AI & Blockchain Technology Holdings" />
        <meta name="twitter:description" content="Building the future through AI and blockchain innovation." />
        
        <link rel="canonical" href="https://locsafe.org/" />
      </Helmet>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTMwIDMwaDMwdjMwSDMwek0wIDBoMzB2MzBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight">Locsafe</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Ventures</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">Portfolio</a>
              <a href="#focus" className="text-sm text-gray-400 hover:text-white transition-colors">Focus Areas</a>
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full text-sm font-medium transition-all hover:border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-screen flex items-center justify-center px-6 pt-20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-gray-400">Building the Future of Technology</span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
            >
              <span className="text-white">Investing in</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tomorrow's Technology
              </span>
              <br />
              <span className="text-white">Today</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Locsafe Ventures is a technology holding company focused on building and scaling 
              transformative companies in artificial intelligence and blockchain technology.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#portfolio"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Portfolio
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a
                href="#about"
                className="px-8 py-4 border border-white/20 rounded-full font-medium text-white hover:bg-white/5 transition-all"
              >
                Learn More
              </a>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <FloatingParticle
                  key={i}
                  delay={i * 0.5}
                  size={Math.random() * 6 + 2}
                  duration={Math.random() * 10 + 15}
                />
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-sm text-cyan-400 uppercase tracking-widest mb-4 block"
                >
                  About Us
                </motion.span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Shaping the Future of
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Digital Innovation</span>
                </h2>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  Locsafe Ventures identifies and nurtures breakthrough technologies at the intersection 
                  of artificial intelligence and blockchain. We partner with visionary founders building 
                  solutions that redefine industries and empower users.
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Our portfolio companies share a common vision: leveraging cutting-edge technology to 
                  create more transparent, efficient, and accessible systems for the digital age.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-sm text-gray-300">Deep Tech Focus</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm text-gray-300">Long-term Vision</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-sm text-gray-300">Active Partnership</span>
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-1">
                  <div className="w-full h-full rounded-3xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
                    {/* Animated Grid */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                    
                    {/* Central Animation */}
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-48 h-48 rounded-full border border-cyan-500/30"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 rounded-full border border-purple-500/30"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-8 rounded-full border border-pink-500/30"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <span className="text-2xl font-bold">L</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Nodes */}
                    {[
                      { top: '20%', left: '20%', delay: 0 },
                      { top: '20%', right: '20%', delay: 0.5 },
                      { bottom: '20%', left: '20%', delay: 1 },
                      { bottom: '20%', right: '20%', delay: 1.5 },
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                        style={pos}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: pos.delay,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section id="focus" className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm text-purple-400 uppercase tracking-widest mb-4 block">
                Investment Thesis
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Our Focus
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Areas</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We invest in technologies that have the potential to fundamentally transform how people interact
                with digital systems and each other.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                  />
                  <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{area.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm text-cyan-400 uppercase tracking-widest mb-4 block">
                Our Companies
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Portfolio
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Companies</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Discover the innovative companies building the next generation of technology solutions.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {portfolioCompanies.map((company, index) => (
                <motion.a
                  key={index}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                  className="group relative block"
                >
                  {/* Background Glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${company.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative p-8 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all overflow-hidden h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          {company.icon}
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-widest">{company.category}</span>
                          <h3 className="text-2xl font-bold text-white">{company.name}</h3>
                        </div>
                      </div>
                      <svg className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>

                    {/* Tagline */}
                    <p className={`text-lg font-medium bg-gradient-to-r ${company.gradient} bg-clip-text text-transparent mb-4`}>
                      {company.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {company.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {company.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs font-medium bg-white/5 rounded-full border border-white/10 text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Visit CTA */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <span className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${company.gradient} bg-clip-text text-transparent`}>
                        Visit {company.name}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: 'currentColor' }} fill="none" viewBox="0 0 24 24" stroke="url(#grad)">
                          <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                          </defs>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>

                    {/* Decorative Elements */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${company.gradient} opacity-5 rounded-full -mr-32 -mt-32 group-hover:opacity-10 transition-opacity`} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-8">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Let's Build the
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Future Together</span>
              </h2>
              
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Whether you're a founder with a breakthrough idea or an investor looking for the next big thing,
                we'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get in Touch
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <a
                  href="mailto:ventures@locsafe.org"
                  className="px-8 py-4 border border-white/20 rounded-full font-medium text-white hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ventures@locsafe.org
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-tight text-white">Locsafe</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Ventures</span>
                  </div>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                  A technology holding company investing in transformative AI and blockchain innovations
                  that shape the future of digital interaction.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://twitter.com/locsafe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/locsafe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/locsafe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <h4 className="font-semibold text-white mb-4">Portfolio</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="https://shadowchain.locsafe.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                      ShadowChain
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://fixflow.locsafe.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                      FixFlow
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                  <li><a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</a></li>
                  <li><a href="#focus" className="text-gray-400 hover:text-white transition-colors text-sm">Focus Areas</a></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Locsafe Ventures. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Building the future of technology
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default LandingPage;
