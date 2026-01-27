import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// Custom SVG Illustrations
const GeometricPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const FloatingOrb = ({ delay = 0, duration = 20, color = "cyan" }) => {
  const colorMap = {
    cyan: "from-cyan-500/20 to-cyan-600/5",
    purple: "from-purple-500/20 to-purple-600/5",
    pink: "from-pink-500/20 to-pink-600/5",
    amber: "from-amber-500/20 to-amber-600/5"
  };

  return (
    <motion.div
      className={`absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br ${colorMap[color]} blur-3xl`}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.2, 0.8, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

FloatingOrb.propTypes = {
  delay: PropTypes.number,
  duration: PropTypes.number,
  color: PropTypes.string
};

const FloatingParticle = ({ delay = 0, size = 4, duration = 20, startX = 0, startY = 0 }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm"
    style={{ width: size, height: size, left: `${startX}%`, top: `${startY}%` }}
    animate={{ 
      y: [-20, -80, -20], 
      x: [0, 20, 0], 
      opacity: [0, 0.6, 0], 
      scale: [0.8, 1.2, 0.8] 
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

FloatingParticle.propTypes = {
  delay: PropTypes.number,
  size: PropTypes.number,
  duration: PropTypes.number,
  startX: PropTypes.number,
  startY: PropTypes.number
};

// Enhanced Credential Badge with skeleton loading
const CredentialBadge = ({ icon, title, description, status, statusColor = "emerald" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsLoaded(true), 300);
    }
  }, [isInView]);

  const colorMap = {
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/20"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative p-4 rounded-xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 hover:border-gray-700/60 transition-all duration-300 overflow-hidden"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
      
      <div className="relative flex items-start gap-3.5">
        {isLoaded ? (
          <>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/40 flex items-center justify-center text-gray-400 group-hover:text-gray-300 group-hover:border-gray-600/40 transition-all duration-300">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-semibold text-white/90 tracking-tight">{title}</h4>
                <span className={`px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded border ${colorMap[statusColor]}`}>
                  {status}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{description}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800/40 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-800/40 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-800/40 rounded animate-pulse w-full" />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

CredentialBadge.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusColor: PropTypes.string
};

// Enhanced Stat Card with counter animation
const StatCard = ({ stat, label, source, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(stat.replace(/[^0-9.]/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat]);

  const formatStat = (value) => {
    if (stat.includes('T')) return `$${value.toFixed(1)}T`;
    if (stat.includes('B')) return `$${Math.round(value)}B`;
    if (stat.includes('%')) return `${Math.round(value)}%`;
    return stat;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative text-center p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 overflow-hidden"
    >
      {/* Animated gradient background on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500"
        initial={false}
      />
      
      <div className="relative">
        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 tabular-nums">
          {isInView ? formatStat(count) : stat}
        </div>
        <p className="text-[13px] text-gray-400 mb-2 leading-relaxed">{label}</p>
        <span className="text-[10px] text-gray-600 uppercase tracking-wider">{source}</span>
      </div>
    </motion.div>
  );
};

StatCard.propTypes = {
  stat: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

// Enhanced Product Card with advanced hover effects
const ProductCard = ({ company, index }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.a
      ref={ref}
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative block"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${company.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
          }}
        />
      )}

      <div className="relative p-7 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 overflow-hidden h-full">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-[0.03]`} />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${company.gradient} flex items-center justify-center text-white shadow-lg`}
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {company.icon}
              </motion.div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">
                  {company.category}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">{company.name}</h3>
              </div>
            </div>
            <motion.svg
              className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </div>

          <p className={`text-[15px] font-medium bg-gradient-to-r ${company.gradient} bg-clip-text text-transparent mb-3`}>
            {company.tagline}
          </p>
          <p className="text-gray-400 text-[13px] mb-5 leading-relaxed">{company.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {company.features.map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 text-[11px] font-medium bg-white/[0.04] rounded-full border border-white/[0.06] text-gray-300 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
              >
                {feature}
              </motion.span>
            ))}
          </div>

          <div className="pt-5 border-t border-white/[0.06]">
            <span className={`inline-flex items-center gap-2 text-[13px] font-medium bg-gradient-to-r ${company.gradient} bg-clip-text text-transparent`}>
              Visit {company.name}
              <motion.svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={isHovered ? { x: 2 } : { x: 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

ProductCard.propTypes = {
  company: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

// Main Landing Page Component
const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.15 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      } 
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
        <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M24 4V44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
          <path d="M4 14L44 34" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
          <path d="M44 14L4 34" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5"/>
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
        <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M24 18V30M18 24H30" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      features: ["Instant Payments", "GitHub Integration", "Auto Bounty Escalation"],
      category: "AI-Powered DevTools"
    }
  ];

  const focusAreas = [
    { 
      title: "Artificial Intelligence", 
      description: "Building transformative AI technologies that automate workflows and enhance decision-making.", 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="16" cy="16" r="4" fill="currentColor"/>
          <path d="M16 4V8M16 24V28M4 16H8M24 16H28M7.5 7.5L10.5 10.5M21.5 21.5L24.5 24.5M7.5 24.5L10.5 21.5M21.5 10.5L24.5 7.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ), 
      gradient: "from-cyan-500 to-blue-600" 
    },
    { 
      title: "Blockchain Technology", 
      description: "Creating decentralized infrastructure prioritizing security, scalability, and user sovereignty.", 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M14 9H18M14 23H18M9 14V18M23 14V18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ), 
      gradient: "from-purple-500 to-violet-600" 
    },
    { 
      title: "Developer Tools", 
      description: "Empowering developers with tools that streamline workflows and accelerate production.", 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <path d="M10 12L4 16L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 12L28 16L22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 8L14 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ), 
      gradient: "from-emerald-500 to-teal-600" 
    },
    { 
      title: "FinTech Innovation", 
      description: "Reimagining financial services through faster, accessible, and equitable technology.", 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16 8V24M12 12H20M12 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ), 
      gradient: "from-amber-500 to-orange-600" 
    }
  ];

  const industryStats = [
    { stat: "$8.4T", label: "Global supply chain losses annually", source: "World Economic Forum" },
    { stat: "73%", label: "Enterprises lack real-time visibility", source: "Gartner Research" },
    { stat: "42%", label: "Data breaches from compromised data", source: "IBM Security Report" },
    { stat: "$680B", label: "Spent on legacy vs. innovation", source: "McKinsey Digital" }
  ];

  const techPrinciples = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ), 
      title: "Security First", 
      description: "End-to-end encryption and zero-knowledge architecture" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ), 
      title: "Performance Optimized", 
      description: "Built for scale with sub-second response times" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ), 
      title: "Developer Friendly", 
      description: "Comprehensive APIs and documentation" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ), 
      title: "Globally Distributed", 
      description: "Multi-region infrastructure for low latency" 
    }
  ];

  const credentials = [
    { 
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ), 
      title: "SOC 2 Type II", 
      description: "Compliance certification in progress", 
      status: "In Progress", 
      statusColor: "amber" 
    },
    { 
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ), 
      title: "AWS Partner Network", 
      description: "Technology partnership established", 
      status: "Active", 
      statusColor: "emerald" 
    },
    { 
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ), 
      title: "Y Combinator Resources", 
      description: "Startup School alumni network", 
      status: "Member", 
      statusColor: "purple" 
    },
    { 
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ), 
      title: "Open Source First", 
      description: "Core components publicly auditable", 
      status: "Committed", 
      statusColor: "cyan" 
    }
  ];

  return (
    <main className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden antialiased" role="main">
      <Helmet>
        <title>Locsafe | AI and Blockchain Technology Company</title>
        <meta name="description" content="Locsafe is a technology company building AI and blockchain innovations. Discover our products: ShadowChain and FixFlow." />
        <meta name="keywords" content="technology company, AI, blockchain technology, ShadowChain, FixFlow, Web3, developer tools, decentralized" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/" />
        <meta property="og:title" content="Locsafe | AI and Blockchain Technology Company" />
        <meta property="og:description" content="Building the future through AI and blockchain innovation. Explore our transformative technology products." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Locsafe | AI and Blockchain Technology Company" />
        <meta name="twitter:description" content="Building the future through AI and blockchain innovation." />
        <link rel="canonical" href="https://locsafe.org/" />
      </Helmet>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 origin-left" 
        style={{ scaleX: smoothProgress }} 
      />

      {/* Background with geometric pattern and floating orbs */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" />
        <GeometricPattern />
        <FloatingOrb delay={0} duration={25} color="purple" />
        <FloatingOrb delay={5} duration={30} color="cyan" />
        <FloatingOrb delay={10} duration={28} color="pink" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-2xl bg-gray-950/60 border-b border-white/[0.04]" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Locsafe home">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                  <span className="text-white font-bold text-base" aria-hidden="true">L</span>
                </div>
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">Locsafe</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <a href="#about" className="px-4 py-2 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]">About</a>
              <a href="#portfolio" className="px-4 py-2 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]">Products</a>
              <a href="#focus" className="px-4 py-2 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]">Focus Areas</a>
              <div className="w-px h-5 bg-white/10 mx-3" aria-hidden="true" />
              <Link to="/contact" className="px-5 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.12] rounded-full text-[13px] font-medium transition-all duration-200">Contact Us</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }} 
          className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
          aria-labelledby="hero-heading"
        >
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] backdrop-blur-sm rounded-full border border-white/[0.06] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-[13px] text-gray-400 font-medium">Building the Future of Technology</span>
            </motion.div>
            
            <motion.h1 
              id="hero-heading"
              variants={itemVariants} 
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight mb-6"
            >
              <span className="text-white">Building</span><br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tomorrow's Technology</span><br />
              <span className="text-white">Today</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-light"
            >
              Locsafe is a technology company creating transformative products in artificial intelligence and blockchain technology.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a 
                href="#portfolio" 
                className="group relative px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium text-[14px] text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a 
                href="#about" 
                className="px-7 py-3.5 border border-white/[0.12] hover:border-white/[0.2] rounded-full font-medium text-[14px] text-white hover:bg-white/[0.04] transition-all duration-200"
              >
                Learn More
              </a>
            </motion.div>
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <FloatingParticle 
                  key={i} 
                  delay={i * 0.8} 
                  size={Math.random() * 4 + 2} 
                  duration={Math.random() * 8 + 18} 
                  startX={Math.random() * 100} 
                  startY={Math.random() * 100} 
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Industry Stats Section */}
        <section className="py-20 px-6 relative" aria-labelledby="stats-heading">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }} 
              className="text-center mb-14"
            >
              <span className="text-[11px] text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-3 block">Why This Matters</span>
              <h2 id="stats-heading" className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">The Problems We're Solving</h2>
              <p className="text-gray-400 text-[15px] max-w-lg mx-auto leading-relaxed">Industry challenges that drive our mission to build better technology solutions.</p>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
              {industryStats.map((item, index) => (
                <StatCard key={index} {...item} index={index} />
              ))}
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }} 
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Our Approach</h3>
                    <p className="text-[12px] text-gray-500">Core technology principles</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {techPrinciples.map((principle, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.1 }} 
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400">
                        {principle.icon}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-white mb-0.5">{principle.title}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{principle.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }} 
                className="space-y-4"
              >
                {credentials.map((cred, index) => (
                  <CredentialBadge key={index} {...cred} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 relative" aria-labelledby="about-heading">
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
                  className="text-[11px] text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-4 block"
                >
                  About Us
                </motion.span>
                <h2 id="about-heading" className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
                  Shaping the Future of
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Digital Innovation</span>
                </h2>
                <p className="text-[15px] text-gray-400 mb-6 leading-relaxed">
                  Locsafe identifies and builds breakthrough technologies at the intersection of artificial intelligence and blockchain. We create solutions that redefine industries and empower users.
                </p>
                <p className="text-[15px] text-gray-400 mb-8 leading-relaxed">
                  Our products share a common vision: leveraging cutting-edge technology to create more transparent, efficient, and accessible systems for the digital age.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
                    <span className="text-[13px] text-gray-300">Deep Tech Focus</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" aria-hidden="true" />
                    <span className="text-[13px] text-gray-300">Long-term Vision</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500" aria-hidden="true" />
                    <span className="text-[13px] text-gray-300">Active Development</span>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                className="relative"
                aria-hidden="true"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-[1px]">
                  <div className="w-full h-full rounded-3xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
                        className="w-48 h-48 rounded-full border border-cyan-500/20" 
                      />
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                        className="absolute inset-4 rounded-full border border-purple-500/20" 
                      />
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
                        className="absolute inset-8 rounded-full border border-pink-500/20" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                          <span className="text-xl font-bold text-white">L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section id="focus" className="py-24 px-6 relative" aria-labelledby="focus-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-16"
            >
              <span className="text-[11px] text-purple-400 uppercase tracking-[0.2em] font-semibold mb-4 block">Our Expertise</span>
              <h2 id="focus-heading" className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
                Focus
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Areas</span>
              </h2>
              <p className="text-[15px] text-gray-400 max-w-xl mx-auto leading-relaxed">
                Technologies that fundamentally transform how people interact with digital systems.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {focusAreas.map((area, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }} 
                  whileHover={{ y: -6 }} 
                  className="group relative"
                >
                  <div className="relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mb-5 text-white group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                      {area.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white tracking-tight">{area.title}</h3>
                    <p className="text-gray-400 text-[13px] leading-relaxed">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 relative" aria-labelledby="portfolio-heading">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-16"
            >
              <span className="text-[11px] text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-4 block">Our Products</span>
              <h2 id="portfolio-heading" className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
                What We're
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Building</span>
              </h2>
              <p className="text-[15px] text-gray-400 max-w-xl mx-auto leading-relaxed">
                Innovative products creating the next generation of technology solutions.
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {portfolioCompanies.map((company, index) => (
                <ProductCard key={index} company={company} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.05] via-transparent to-transparent" aria-hidden="true" />
          <div className="max-w-3xl mx-auto relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/15 to-purple-500/15 mb-8" aria-hidden="true">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
                Let's Build the
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Future Together</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                Whether you're a developer interested in our products or a potential partner, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link 
                  to="/contact" 
                  className="group relative px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium text-[14px] text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get in Touch
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <a 
                  href="mailto:hello@locsafe.org" 
                  className="px-7 py-3.5 border border-white/[0.12] hover:border-white/[0.2] rounded-full font-medium text-[14px] text-white hover:bg-white/[0.04] transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@locsafe.org
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/[0.04]" role="contentinfo">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-3 mb-6" aria-label="Locsafe home">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base" aria-hidden="true">L</span>
                  </div>
                  <span className="font-semibold text-lg tracking-tight text-white">Locsafe</span>
                </Link>
                <p className="text-gray-400 text-[13px] leading-relaxed max-w-sm mb-6">
                  A technology company building transformative AI and blockchain innovations that shape the future of digital interaction.
                </p>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://twitter.com/locsafe" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors duration-200"
                    aria-label="Follow us on Twitter"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com/company/locsafe" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors duration-200"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/locsafe" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors duration-200"
                    aria-label="Follow us on GitHub"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4 text-[14px]">Products</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://shadowchain.locsafe.org" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px] flex items-center gap-1.5"
                    >
                      ShadowChain
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://fixflow.locsafe.org" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px] flex items-center gap-1.5"
                    >
                      FixFlow
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4 text-[14px]">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px]">About Us</a></li>
                  <li><a href="#portfolio" className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px]">Products</a></li>
                  <li><a href="#focus" className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px]">Focus Areas</a></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px]">Contact</Link></li>
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px]">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-[13px]">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-[13px]">© {new Date().getFullYear()} Locsafe. All rights reserved.</p>
              <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
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
