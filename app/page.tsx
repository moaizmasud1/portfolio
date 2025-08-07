"use client"

import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Globe,
  Star,
  Award,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import SplashCursor from "../components/SplashCursor";
import WhatsAppIcon from "./components/WhatsAppIcon";
import Preloader from "./components/Preloader";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [showHeader, setShowHeader] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [skillTab, setSkillTab] = useState(0);
  // --- Custom blue glowing cursor for hero section ---
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showHeroCursor, setShowHeroCursor] = useState(false);
  const heroCursorRef = useRef<HTMLDivElement>(null);
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [showHeroBlob, setShowHeroBlob] = useState(false);
  const animationRef = useRef<number | null>(null);
  // Splash cursor state for hero section
  const [splashPos, setSplashPos] = useState<{ x: number; y: number } | null>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Believe you can and you're halfway there.",
    "Push yourself, because no one else is going to do it for you.",
    "Opportunities don't happen, you create them.",
    "Don't stop when you're tired. Stop when you're done.",
    "The harder you work for something, the greater you'll feel when you achieve it."
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Animated left-side scrolling texts
  const leftMessages = [
    "Hi, welcome to my profile.",
    "I'm a ctrl C + ctrl V engineer",
    "Enjoy your stay!",
    "Let's build something cool.",
    "I debug by yelling at my screen.",
    "Professional coffee drinker.",
    "I turn caffeine into code.",
    "My code works... on my machine.",
    "I write bugs, then fix them for a living.",
    "Stack Overflow is my best friend.",
    "I can explain it to you, but I can't understand it for you.",
    "I use dark mode even in daylight.",
    "I break things just to fix them.",
    "I'm not lazy, I'm on energy-saving mode.",
    "I'm silently correcting your grammar.",
    "I put the 'pro' in procrastinate.",
    
  ];
  const [leftMsgIndex, setLeftMsgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftMsgIndex((prev) => (prev + 1) % leftMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [leftMessages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * motivationalQuotes.length);
      } while (nextIndex === quoteIndex);
      setQuoteIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [quoteIndex, motivationalQuotes.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })

      gsap.fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out" },
      )

      // Parallax background
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // About section animations
      gsap.fromTo(
        ".about-text",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Skills sticky animation
      gsap.to(".skills-progress", {
        width: "100%",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      })

      // Projects scroll animation
      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Floating elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      })

      // White dots animation
      gsap.to(".white-dot", {
        y: -30,
        x: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      // Show scroll-to-top button when scrolled down
      if (currentScrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show header on mouse enter at the top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setShowHeader(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth trailing animation for the abstract blob
  useEffect(() => {
    if (!showHeroBlob) return;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const animate = () => {
      setTrailPos(prev => {
        const x = lerp(prev.x, cursorPos.x, 0.13);
        const y = lerp(prev.y, cursorPos.y, 0.13);
        return { x, y };
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [cursorPos, showHeroBlob]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setSplashPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const hero = heroRef.current;
    if (hero) hero.addEventListener('mousemove', handleMouseMove);
    if (hero) hero.addEventListener('mouseleave', () => setSplashPos(null));
    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
      if (hero) hero.removeEventListener('mouseleave', () => setSplashPos(null));
    };
  }, []);

  const [expTab, setExpTab] = useState(0);
  
  const expTabs = [
    {
      title: "EXPERIENCE",
      stats: [
        { icon: Calendar, number: "2+", label: "YEARS EXPERIENCE" },
        { icon: Code, number: "50+", label: "PROJECTS COMPLETED" },
        { icon: Users, number: "100+", label: "HAPPY CLIENTS" },
        { icon: Award, number: "1+", label: "AWARDS WON" },
      ],
    },
    {
      title: "EDUCATION",
      stats: [
        { icon: Calendar, number: "2023", label: "GRADUATED" },
        { icon: Code, number: "BSCS", label: "COMPUTER SCIENCE" },
        { icon: Users, number: "CASHIER LESS STORE", label: "PROJECT" },
        { icon: Award, number: "2", label: "HONORS" },
      ],
    },
    {
      title: "CERTIFICATION",
      stats: [
        { icon: Award, number: "5+", label: "CERTIFICATES" },
        { icon: Code, number: "3", label: "ONLINE COURSES" },
        { icon: Users, number: "2", label: "BOOTCAMPS" },
        { icon: Calendar, number: "2025", label: "LAST UPDATED" },
      ],
    },
  ];

  useEffect(() => {
    // Animation disabler for all devices
    const disableAnimations = () => {
      // Disable all animations immediately for all devices
      const style = document.createElement('style');
      style.id = 'global-animation-disabler';
      style.textContent = `
        * {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
        *:hover {
          transform: none !important;
          scale: none !important;
          animation: none !important;
        }
        [data-framer-motion] {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Mobile detection
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth < 768;
      const isMobileResult = isMobileDevice || isSmallScreen;
      setIsMobile(isMobileResult);
      
      // Add a class to body for CSS targeting
      if (isMobileResult) {
        document.body.classList.add('mobile-device');
        // Ensure header is always visible on mobile
        setShowHeader(true);
      } else {
        document.body.classList.remove('mobile-device');
      }
    };
    
    // Disable animations for all devices
    disableAnimations();
    
    // Run mobile detection
    checkMobile();
    
    // Also run after a short delay to ensure it's set
    const timer = setTimeout(checkMobile, 100);
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
      // Clean up animation disabler
      const existingStyle = document.getElementById('global-animation-disabler');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Helper function for mobile-friendly animations
  const getMobileAnimation = (desktopAnimation: any) => {
    return {}; // Disable animations on all devices
  };

  // Helper function to completely disable animations on mobile
  const getMobileProps = (desktopProps: any) => {
    return {}; // Disable animations on all devices
  };

  // Helper function to disable all motion on mobile
  const getMobileMotionProps = (desktopProps: any) => {
    return {
      initial: {},
      animate: {},
      exit: {},
      whileHover: {},
      whileTap: {},
      transition: {}
    }; // Disable all motion on all devices
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {/* Main content - hidden while preloader is running */}
      <div className={isLoading ? 'hidden' : ''}>
      {/* Glassmorphism Header */}
      <header
        ref={headerRef}
        className={`fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] sm:w-[95vw] max-w-5xl rounded-2xl sm:rounded-3xl bg-white/15 backdrop-blur-lg shadow-xl border border-white/20 transition-transform duration-500 pointer-events-auto ${isMobile ? 'translate-y-0 opacity-100' : (showHeader ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none')}`}
        onMouseEnter={() => !isMobile && setShowHeader(true)}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-8 py-3 sm:py-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/profile.jpg" alt="Logo" className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-xl sm:rounded-2xl object-cover shadow-lg" />
            <span className="font-black text-base sm:text-lg md:text-2xl tracking-tight text-white/95">My Profile</span>
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <a href="#about" className="text-white/80 font-semibold hover:text-white transition-colors px-2 md:px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm md:text-base">About</a>
            <a href="#skills" className="text-white/80 font-semibold hover:text-white transition-colors px-2 md:px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm md:text-base">Skills</a>
            <a href="#projects" className="text-white/80 font-semibold hover:text-white transition-colors px-2 md:px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm md:text-base">Projects</a>
            <a href="#testimonials" className="text-white/80 font-semibold hover:text-white transition-colors px-2 md:px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm md:text-base">Testimonials</a>
            <a href="#contact" className="text-white/80 font-semibold hover:text-white transition-colors px-2 md:px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm md:text-base">Contact</a>
        </nav>

          {/* Mobile - Show only My Profile, no menu button */}
          <div className="md:hidden"></div>
        </div>

        {/* Mobile Navigation - Always visible below profile */}
        <div className="md:hidden px-3 sm:px-4 pb-3 sm:pb-4">
          <nav className="flex justify-center gap-2 sm:gap-3">
            <a href="#about" className="text-white/80 font-semibold hover:text-white transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm">About</a>
            <a href="#skills" className="text-white/80 font-semibold hover:text-white transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm">Skills</a>
            <a href="#projects" className="text-white/80 font-semibold hover:text-white transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm">Projects</a>
            <a href="#testimonials" className="text-white/80 font-semibold hover:text-white transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm">Testimonials</a>
            <a href="#contact" className="text-white/80 font-semibold hover:text-white transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm">Contact</a>
          </nav>
        </div>

        {/* Mobile Navigation Menu - Removed since we only show My Profile on mobile */}
      </header>
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-32 pb-16 md:pb-32 px-4 md:px-8 lg:px-16"
      >
        {/* SplashCursor effect in hero section background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SplashCursor />
        </div>
        {/* Animated colorful blobs and floating dots in hero background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Blurred monochrome blobs (reduced for performance) */}
          <div className="absolute top-1/4 left-1/5 w-40 h-40 md:w-60 md:h-60 bg-gradient-to-br from-white via-gray-300 to-gray-500 opacity-20 rounded-full blur-xl animate-blob1" style={{ willChange: 'transform' }} />
          <div className="absolute top-2/3 right-1/4 w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-gray-400 via-white to-gray-300 opacity-15 rounded-full blur-xl animate-blob2" style={{ willChange: 'transform' }} />
          {/* Fewer floating dots */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-30 animate-float-dot"
              style={{
                width: `${Math.random() * 10 + 8}px`,
                height: `${Math.random() * 10 + 8}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${Math.random() * 3}s`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
        {/* Animated Left-Side Scrolling Texts - Hidden on mobile */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-64 flex flex-col items-start pointer-events-none select-none hidden md:flex">
          <motion.div
            key={leftMsgIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl font-bold text-white/80 bg-black/30 px-5 py-3 rounded-r-2xl shadow-lg"
          >
            {leftMessages[leftMsgIndex]}
          </motion.div>
        </div>
        <motion.div className="parallax-bg absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(204,204,204,0.05),transparent_50%)]"></div>
        </motion.div>

        <motion.div className="relative z-10 text-center px-4" style={{ y: textY }}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Moaiz</span>
            <br />
            <span className="text-white">Masud</span>
          </motion.h1>
          
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Floating particles for subtitle */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ 
                  x: [0, 80, 0],
                  y: [0, -40, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  delay: 0,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm"
                style={{ left: '5%', top: '50%' }}
              />
              <motion.div
                animate={{ 
                  x: [0, -60, 0],
                  y: [0, 30, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  delay: 3,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-pink-400 rounded-full blur-sm"
                style={{ right: '10%', bottom: '30%' }}
              />
              <motion.div
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, -25, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 9, 
                  repeat: Infinity, 
                  delay: 6,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-blue-400 rounded-full blur-sm"
                style={{ left: '70%', top: '20%' }}
              />
            </div>

            {/* Animated background for subtitle */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-3xl" />
            
            <motion.p 
              className="hero-subtitle text-xl md:text-2xl font-bold tracking-wide mb-8 relative z-10 group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                AI-Powered Full Stack Developer & SEO Strategist
              </motion.span>
            </motion.p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            {isMobile ? (
              <>
                <a
                  href="#projects"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg tracking-wide hover:bg-gray-200 transition-all duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1"
                >
                  VIEW WORK
                </a>
                <Link href="/contact">
                  <div
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold text-base sm:text-lg tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-pointer rounded-lg hover:shadow-lg hover:-translate-y-1"
                  >
                    CONTACT
                  </div>
                </Link>
              </>
            ) : (
              <>
            <motion.a
              href="#projects"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg tracking-wide hover:bg-gray-200 transition-all duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
            >
              VIEW WORK
            </motion.a>
            <Link href="/contact">
              <motion.div
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold text-base sm:text-lg tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-pointer rounded-lg hover:shadow-lg hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
              >
                CONTACT
              </motion.div>
            </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="floating-element absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full"></div>
        <div className="floating-element absolute top-40 right-32 w-6 h-6 bg-blue-500 rounded-full"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-3 h-3 bg-pink-500 rounded-full"></div>

        {/* Floating Motivational Quote - Hidden on mobile, shown on desktop */}
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-10 right-10 z-20 max-w-md rounded-2xl px-6 py-4 shadow-lg flex items-center gap-2 hidden md:flex"
        >
          <span className="text-3xl md:text-4xl text-white/80 font-bold italic drop-shadow-lg">"</span>
          <span className="text-base md:text-lg text-white/90 font-medium text-left px-2">{motivationalQuotes[quoteIndex]}</span>
          <span className="text-3xl md:text-4xl text-white/80 font-bold italic drop-shadow-lg">"</span>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="about-section pt-32 pb-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="white-dot absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-32 right-24 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-24 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-10 right-1/4 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-3/4 right-10 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ABOUT ME
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="about-text relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Floating particles for text section */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ 
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    delay: 0,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm"
                  style={{ left: '10%', top: '20%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    delay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 bg-pink-400 rounded-full blur-sm"
                  style={{ right: '15%', bottom: '30%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, 60, 0],
                    y: [0, -30, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    delay: 4,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full blur-sm"
                  style={{ left: '60%', top: '60%' }}
                />
              </div>

              <motion.p 
                className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-8 relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                I design with purpose and code with imagination—building digital worlds that connect and inspire.
              </motion.p>
              <motion.p 
                className="text-lg leading-relaxed text-gray-400 mb-8 relative z-10"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                With expertise in modern web technologies, I specialize in creating immersive, interactive websites that
                tell stories and engage audiences through motion and design.
              </motion.p>
              
              <div className="flex gap-6 mb-8 relative z-10">
                <motion.a
                  href="https://www.linkedin.com/in/moaiz-masud-461633222/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 hover:border-blue-400 transition-all duration-300"
                  whileHover={getMobileAnimation({ scale: 1.02, y: -2 })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <Linkedin size={32} className="text-white group-hover:text-blue-400 transition-colors relative z-10" />
                </motion.a>
                
                <motion.a
                  href="mailto:moaizmasud@gmail.com"
                  className="group relative p-3 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 hover:border-green-400 transition-all duration-300"
                  whileHover={getMobileAnimation({ scale: 1.02, y: -2 })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <Mail size={32} className="text-white group-hover:text-green-400 transition-colors relative z-10" />
                </motion.a>
                
                <motion.a
                  href="https://wa.me/447881395979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 hover:border-green-500 transition-all duration-300"
                  whileHover={getMobileAnimation({ scale: 1.02, y: -2 })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <WhatsAppIcon size={32} className="text-white group-hover:text-green-500 transition-colors relative z-10" />
                </motion.a>
                
                <motion.a
                  href="https://x.com/chaudharymoaiz1?s=21&t=F1KmXA5Z0-f9prKOcE1nfA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 hover:border-blue-400 transition-all duration-300"
                  whileHover={getMobileAnimation({ scale: 1.02, y: -2 })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <Twitter size={32} className="text-white group-hover:text-blue-400 transition-colors relative z-10" />
                </motion.a>
              </div>
              
              <motion.a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-lg mt-2 overflow-hidden"
                whileHover={getMobileAnimation({ scale: 1.02, y: -2 })}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                </svg>
                <span className="relative z-10">My CV</span>
              </motion.a>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
            >
              {/* Floating particles for image section */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ 
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: 1,
                    ease: "easeInOut"
                  }}
                  className="absolute w-3 h-3 bg-purple-400 rounded-full blur-sm"
                  style={{ right: '10%', top: '20%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, 80, 0],
                    y: [0, -50, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    delay: 3,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-pink-400 rounded-full blur-sm"
                  style={{ left: '15%', bottom: '25%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    delay: 5,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full blur-sm"
                  style={{ right: '30%', top: '70%' }}
                />
                </div>

              <motion.div 
                className="w-[400px] h-[520px] mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-[2.5rem] flex items-center justify-center p-1 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500"
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[380px] h-[500px] bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 rounded-[2.5rem] flex items-center justify-center overflow-hidden relative">
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
                  
                  <motion.img 
                    src="/profile.jpg" 
                    alt="Moaiz Masud" 
                    className="w-[380px] h-[500px] object-cover rounded-[2.5rem] relative z-10 group-hover:scale-102 transition-transform duration-500" 
                    whileHover={getMobileAnimation({ scale: 1.02 })}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] z-20" />
              </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="pt-10 pb-10 px-4 md:px-8 lg:px-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 zebra-bg pointer-events-none"></div>
        
        {/* Floating particles for experience section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -80, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              delay: 0,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-purple-400 rounded-full blur-sm"
            style={{ left: '10%', top: '20%' }}
          />
          <motion.div
            animate={{ 
              x: [0, -120, 0],
              y: [0, 60, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              delay: 2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-pink-400 rounded-full blur-sm"
            style={{ right: '15%', bottom: '30%' }}
          />
          <motion.div
            animate={{ 
              x: [0, 80, 0],
              y: [0, -40, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 9, 
              repeat: Infinity, 
              delay: 4,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full blur-sm"
            style={{ left: '60%', top: '60%' }}
          />
          <motion.div
            animate={{ 
              x: [0, -60, 0],
              y: [0, 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              delay: 6,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm"
            style={{ right: '40%', top: '40%' }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {expTabs[expTab].title}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expTabs[expTab].stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 border border-gray-700 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  rotateY: 2, 
                  scale: 1.01,
                  transition: { duration: 0.3, type: "spring", stiffness: 200 }
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{ 
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full blur-sm"
                    style={{ left: '20%', top: '30%' }}
                  />
                  <motion.div
                    animate={{ 
                      x: [0, -25, 0],
                      y: [0, 15, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      delay: index * 0.5 + 2,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-pink-400 rounded-full blur-sm"
                    style={{ right: '25%', bottom: '40%' }}
                  />
                </div>

                {/* Animated icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-purple-500/30 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 shadow-lg group-hover:scale-105 group-hover:border-purple-400/60 transition-all duration-500 flex items-center justify-center"
                    whileHover={getMobileAnimation({ rotate: 180 })}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-white group-hover:text-purple-300 transition-colors duration-300"
                    >
                      <stat.icon size={32} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.h3
                    className="text-4xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"
                    whileHover={getMobileAnimation({ scale: 1.02 })}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <motion.p
                    className="text-white font-bold tracking-wide group-hover:text-gray-300 transition-colors duration-300"
                    whileHover={getMobileAnimation({ scale: 1.01 })}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Swipe Button */}
          <div className="flex justify-center mt-10">
            <motion.button
              className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
              style={{ border: 'none' }}
              onClick={() => setExpTab((expTab + 1) % expTabs.length)}
              aria-label="Swipe"
              whileHover={getMobileAnimation({ scale: 1.02, rotate: 180 })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowRight className="text-white w-8 h-8 relative z-10 group-hover:rotate-180 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Skills Section with Sticky Elements */}
      <section id="skills" className="skills-section pt-32 pb-48 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="white-dot absolute top-12 left-16 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-36 right-28 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-28 left-1/2 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-12 right-1/5 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-1/3 right-1/2 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-1/4 left-1/5 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-3/5 right-16 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SKILLS
          </motion.h2>
          {/* Centered Skills Grid/TabSwitcher */}
          <div className="flex flex-col items-center justify-center w-full mt-16">
            <div className="w-full max-w-4xl px-4">
              <TabSwitcher />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-32 pb-32 px-4 md:px-8 lg:px-16 relative overflow-hidden" style={{ background: '#141414' }}>
        {/* Giraffe-like black patches */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => {
            // Randomize position, size, and border radius
            const top = Math.random() * 80 + 5; // 5% to 85%
            const left = Math.random() * 80 + 5;
            const width = Math.random() * 80 + 60; // 60px to 140px
            const height = Math.random() * 40 + 40; // 40px to 80px
            const borderRadius = Math.random() * 40 + 30; // 30px to 70px
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${top}%`,
                  left: `${left}%`,
                  width,
                  height,
                  background: '#000',
                  opacity: 0.18,
                  borderRadius: `${borderRadius}%`,
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                }}
              />
            );
          })}
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SERVICES
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "WEB DEVELOPMENT",
                description: "Custom websites and web applications built with modern technologies like React, Next.js, and TypeScript",
                icon: "🌐",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "UI/UX DESIGN",
                description: "Beautiful and intuitive user interfaces that convert visitors to customers with Figma and modern design systems",
                icon: "🎨",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "AI CHATBOT DEVELOPMENT",
                description: "Conversational AI bots tailored for your business needs using OpenAI and custom AI solutions",
                icon: "🤖",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "E-COMMERCE SOLUTIONS",
                description: "Complete online stores with payment integration, inventory management, and modern shopping experiences",
                icon: "🛒",
                color: "from-orange-500 to-red-500"
              },
              {
                title: "SEO OPTIMIZATION & REPORTS",
                description: "Comprehensive SEO analysis, technical audits, keyword research, performance reports, and ongoing optimization strategies to boost search rankings and drive organic traffic",
                icon: "📊",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "API DEVELOPMENT",
                description: "RESTful APIs and backend services built with Node.js, Python, and modern database technologies",
                icon: "🔧",
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "MOBILE DEVELOPMENT",
                description: "Cross-platform mobile applications using React Native and modern mobile frameworks",
                icon: "📱",
                color: "from-teal-500 to-blue-500"
              },
              {
                title: "PERFORMANCE OPTIMIZATION",
                description: "Website speed optimization, Core Web Vitals improvement, and performance monitoring",
                icon: "⚡",
                color: "from-red-500 to-pink-500"
              },
              {
                title: "TECHNICAL CONSULTING",
                description: "Technical consulting, code reviews, and architecture planning to optimize your projects",
                icon: "💡",
                color: "from-violet-500 to-purple-500"
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 border border-gray-700 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  rotateY: 2, 
                  scale: 1.01,
                  transition: { duration: 0.3, type: "spring", stiffness: 200 }
                }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{ 
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                    className={`absolute w-3 h-3 bg-gradient-to-r ${service.color} rounded-full blur-sm`}
                    style={{ left: '20%', top: '30%' }}
                  />
                  <motion.div
                    animate={{ 
                      x: [0, -80, 0],
                      y: [0, 60, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      delay: index * 0.7,
                      ease: "easeInOut"
                    }}
                    className={`absolute w-2 h-2 bg-gradient-to-r ${service.color} rounded-full blur-sm`}
                    style={{ right: '25%', bottom: '40%' }}
                  />
                </div>

                {/* Animated icon */}
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-4 border-gradient-to-r ${service.color} bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center`}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-2xl group-hover:text-white transition-colors duration-300"
                    >
                      {service.icon}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Service content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl font-black tracking-wide mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="projects-section pt-32 pb-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0">
          <div className="white-dot absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-40 right-32 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-60 left-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-40 right-1/4 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-60 left-1/3 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-80 right-20 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PROJECTS
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "PORTFOLIO WEBSITE",
                tech: "Next.js, React, Framer Motion",
                image: "/project.png",
                link: "https://mktgportfolio.com/nusratmkhan",
                description: "Modern animated portfolio with SEO optimization"
              },
              {
                title: "E-COMMERCE PLATFORM",
                tech: "Shopify, React, Payment Gateway",
                image: "/project.png",
                link: "https://www.theredsquirrel.co.uk/",
                description: "Full-stack e-commerce with payment integration"
              },
              {
                title: "AI CHATBOT",
                tech: "Smart Home AI, IoT Integration, Voice Control",
                image: "/project.png",
                link: "https://homegenius.pk/",
                description: "AI-powered smart home automation platform"
              },
              {
                title: "STATIC WEBSITE",
                tech: "HTML5, CSS3, JavaScript, Responsive Design",
                image: "/project.png",
                link: "https://elencolouvavel.com/",
                description: "Professional static website with modern design"
              },
              {
                title: "SEO ANALYTICS DASHBOARD",
                tech: "Real-time KPI Dashboards, 90+ Integrations",
                image: "/project.png",
                link: "https://www.geckoboard.com/",
                description: "Professional KPI dashboard and analytics platform"
              },
              {
                title: "MOBILE APP",
                tech: "Fitness Management, Cross-Platform, Payment Integration",
                image: "/project.png",
                link: "https://learn.goteamup.com/demo",
                description: "Professional fitness studio management mobile app"
              },
            ].map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="pt-32 pb-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 zebra-bg pointer-events-none"></div>
        
        {/* Floating particles for testimonials section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <motion.div
            animate={{ 
              x: [0, 120, 0],
              y: [0, -60, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 9, 
              repeat: Infinity, 
              delay: 0,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-purple-400 rounded-full blur-sm"
            style={{ left: '15%', top: '25%' }}
          />
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              y: [0, 80, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 11, 
              repeat: Infinity, 
              delay: 3,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-pink-400 rounded-full blur-sm"
            style={{ right: '20%', bottom: '35%' }}
          />
          <motion.div
            animate={{ 
              x: [0, 90, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              delay: 6,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full blur-sm"
            style={{ left: '70%', top: '45%' }}
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 40, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              delay: 2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm"
            style={{ right: '35%', top: '60%' }}
          />
          <motion.div
            animate={{ 
              x: [0, 70, 0],
              y: [0, -30, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              delay: 4,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full blur-sm"
            style={{ left: '40%', bottom: '25%' }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            TESTIMONIALS
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                text: "Moaiz delivered an exceptional website that exceeded our expectations. His attention to detail and creative vision is unmatched.",
                rating: 5,
                emoji: "🚀",
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Mike Chen",
                role: "Founder, DesignCo",
                text: "Working with Moaiz was a game-changer for our business. The mobile app he built increased our user engagement by 300%.",
                rating: 5,
                emoji: "💡",
                color: "from-purple-500 to-pink-500"
              },
              {
                name: "Emily Davis",
                role: "Marketing Director",
                text: "Professional, creative, and reliable. Moaiz transformed our brand identity and created a stunning e-commerce platform.",
                rating: 5,
                emoji: "🎯",
                color: "from-green-500 to-emerald-500"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 border border-gray-700 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  rotateY: 2, 
                  scale: 1.01,
                  transition: { duration: 0.3, type: "spring", stiffness: 200 }
                }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{ 
                      x: [0, 40, 0],
                      y: [0, -30, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      delay: index * 0.8,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full blur-sm"
                    style={{ left: '15%', top: '20%' }}
                  />
                  <motion.div
                    animate={{ 
                      x: [0, -35, 0],
                      y: [0, 25, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity, 
                      delay: index * 0.8 + 3,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-pink-400 rounded-full blur-sm"
                    style={{ right: '20%', bottom: '30%' }}
                  />
                </div>

                {/* Animated emoji icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-4 border-gradient-to-r ${testimonial.color} bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center`}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-2xl group-hover:text-white transition-colors duration-300"
                    >
                      {testimonial.emoji}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className="flex mb-4 justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                  {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star size={20} className="text-yellow-400 fill-current hover:text-yellow-300 transition-colors" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    "{testimonial.text}"
                  </motion.p>
                  
                <div>
                    <motion.h4 
                      className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <motion.p 
                      className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      {testimonial.role}
                    </motion.p>
                </div>
                </div>

                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${testimonial.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Purple Background and White Dots */}
      <section id="contact" className="pt-32 pb-48 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        {/* Animated White Dots */}
        <div className="absolute inset-0">
          <div className="white-dot absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-40 right-32 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="white-dot absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="white-dot absolute top-60 left-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="white-dot absolute bottom-40 right-1/4 w-3 h-3 bg-white rounded-full opacity-30"></div>
          <div className="white-dot absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="white-dot absolute bottom-60 left-1/3 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="white-dot absolute top-80 right-20 w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>

        {/* Floating particles for contact section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <motion.div
            animate={{ 
              x: [0, 150, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              delay: 0,
              ease: "easeInOut"
            }}
            className="absolute w-4 h-4 bg-purple-400 rounded-full blur-sm"
            style={{ left: '10%', top: '30%' }}
          />
          <motion.div
            animate={{ 
              x: [0, -130, 0],
              y: [0, 90, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              delay: 4,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-pink-400 rounded-full blur-sm"
            style={{ right: '15%', bottom: '40%' }}
          />
          <motion.div
            animate={{ 
              x: [0, 110, 0],
              y: [0, -70, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              delay: 8,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm"
            style={{ left: '70%', top: '50%' }}
          />
          <motion.div
            animate={{ 
              x: [0, -90, 0],
              y: [0, 60, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 13, 
              repeat: Infinity, 
              delay: 2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm"
            style={{ right: '45%', top: '70%' }}
          />
          <motion.div
            animate={{ 
              x: [0, 80, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 11, 
              repeat: Infinity, 
              delay: 6,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full blur-sm"
            style={{ left: '35%', bottom: '30%' }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background for title */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-3xl" />
            
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
          >
            LET'S WORK
              </motion.span>
          </motion.h2>
          </motion.div>
          
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Animated background for subtitle */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-3xl" />
            
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter mb-16 relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
          >
            TOGETHER
              </motion.span>
          </motion.h2>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Animated background for description */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl blur-2xl" />
            
            <motion.p
              className="text-xl md:text-2xl text-purple-100 mb-12 max-w-2xl mx-auto relative z-10 group-hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
          >
            Ready to bring your ideas to life? Let's create something amazing together.
          </motion.p>
          </motion.div>

          <Link href="/contact">
            <motion.div
              className="group relative inline-block cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              {/* Enhanced button with gradient background */}
              <div className="relative px-12 py-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating particles inside button */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{ 
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: 0,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-sm"
                    style={{ left: '20%', top: '30%' }}
                  />
                  <motion.div
                    animate={{ 
                      x: [0, -25, 0],
                      y: [0, 15, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      delay: 2,
                      ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-sm"
                    style={{ right: '25%', bottom: '40%' }}
                  />
                </div>
                
                {/* Button text */}
                <span className="relative z-10">GET IN TOUCH</span>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 touch-manipulation"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={getMobileAnimation({ scale: 1.1, y: -5 })}
            whileTap={getMobileAnimation({ scale: 0.95 })}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronUp className="w-6 h-6 text-white mx-auto" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
      </div> {/* Close the main content div */}
    </div>
  );
}

// TabSwitcher component for beautiful tabs and animated indicator
function TabSwitcher() {
  const [skillTab, setSkillTab] = useState(0);
  const tabNames = ["Technical Skills", "Soft Skills", "Tools"];
  const tabRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const node = tabRefs[skillTab].current;
    if (node) {
      setIndicatorStyle({ left: node.offsetLeft, width: node.offsetWidth });
    }
  }, [skillTab]);

  return (
    <div className="relative flex flex-col items-center mb-14 w-full">
      <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg px-2 py-2 gap-2 relative min-w-[320px]">
        {/* Animated indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-1 left-0 h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-r from-white/80 via-gray-500/80 to-white/80 shadow-lg transition-all duration-500 ease-[cubic-bezier(.4,2,.6,1)] z-0"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width, pointerEvents: 'none' }}
        />
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            ref={tabRefs[idx]}
            onClick={() => setSkillTab(idx)}
            className={`relative z-10 px-7 py-2 font-bold font-mono rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400
              ${skillTab === idx ? 'text-black scale-105 bg-gradient-to-r from-white/80 via-gray-600/80 to-white/80 shadow' : 'text-gray-300 hover:text-white hover:scale-105'}`}
            aria-selected={skillTab === idx}
            tabIndex={0}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content with smooth fade/slide */}
      <div className="w-full mt-12">
        <AnimatePresence mode="wait">
          <TabContent key={skillTab} skillTab={skillTab} />
        </AnimatePresence>
      </div>
    </div>
  );
}

// TabContent component for animated tab panels
function TabContent({ skillTab }: { skillTab: number }) {
  return (
    <motion.div
      key={skillTab}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 2, 0.6, 1] }}
    >
      {skillTab === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {[
            { icon: Code, title: "FRONTEND", skills: ["React", "Next.js", "TypeScript", "Tailwind"], color: "from-blue-500 to-cyan-500", emoji: "⚛️" },
            { icon: Globe, title: "BACKEND", skills: ["Node.js", "Python", "PostgreSQL", "FastApi"], color: "from-green-500 to-emerald-500", emoji: "🔧" },
            { icon: Zap, title: "ANIMATION", skills: ["GSAP", "Framer Motion", "CSS", "WebGL"], color: "from-purple-500 to-pink-500", emoji: "✨" },
            { icon: Star, title: "SEO", skills: ["Google Analytics", "Search Console", "Keyword Research", "Technical SEO"], color: "from-orange-500 to-red-500", emoji: "📊" },
            { icon: Palette, title: "DESIGN", skills: ["Figma", "shadcn", "UI/UX", "ReactBits"], color: "from-indigo-500 to-purple-500", emoji: "🎨" },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative text-center bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] w-full border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                rotateY: 2, 
                scale: 1.01,
                transition: { duration: 0.3, type: "spring", stiffness: 200 }
              }}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-3 h-3 bg-gradient-to-r ${category.color} rounded-full blur-sm`}
                  style={{ left: '20%', top: '30%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: index * 0.7,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-2 h-2 bg-gradient-to-r ${category.color} rounded-full blur-sm`}
                  style={{ right: '25%', bottom: '40%' }}
                />
              </div>

              {/* Animated icon */}
              <div className="mb-6 relative z-10">
                <motion.div 
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-4 border-gradient-to-r ${category.color} bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center mx-auto`}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-3xl group-hover:text-white transition-colors duration-300"
                  >
                    {category.emoji}
                  </motion.div>
                </motion.div>
                    </div>

              {/* Category title */}
              <motion.h3 
                className="text-2xl font-black tracking-wide mb-6 text-white text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {category.title}
              </motion.h3>

              {/* Skills list */}
              <div className="space-y-4 text-center relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill} 
                    className="relative text-center"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-base text-gray-200 mb-2 font-semibold tracking-wide text-center group-hover:text-gray-100 transition-colors duration-300">{skill}</div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                  </div>
                  </motion.div>
                ))}
              </div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${category.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      )}
      {skillTab === 1 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { skill: 'Communication', emoji: '💬', color: 'from-blue-500 to-cyan-500' },
            { skill: 'Problem Solving', emoji: '🧩', color: 'from-green-500 to-emerald-500' },
            { skill: 'Teamwork', emoji: '🤝', color: 'from-purple-500 to-pink-500' },
            { skill: 'Adaptability', emoji: '🔄', color: 'from-orange-500 to-red-500' },
            { skill: 'Creativity', emoji: '🎭', color: 'from-indigo-500 to-purple-500' },
            { skill: 'Critical Thinking', emoji: '🧠', color: 'from-yellow-500 to-orange-500' },
            { skill: 'Time Management', emoji: '⏰', color: 'from-teal-500 to-blue-500' },
            { skill: 'Leadership', emoji: '👑', color: 'from-red-500 to-pink-500' },
            { skill: 'Analytical Thinking', emoji: '📊', color: 'from-violet-500 to-purple-500' },
            { skill: 'Attention to Detail', emoji: '🔍', color: 'from-blue-500 to-indigo-500' },
            { skill: 'Client Relations', emoji: '🤝', color: 'from-green-500 to-teal-500' },
            { skill: 'Project Management', emoji: '📋', color: 'from-purple-500 to-violet-500' },
            { skill: 'Strategic Planning', emoji: '🎯', color: 'from-orange-500 to-yellow-500' },
            { skill: 'Innovation', emoji: '💡', color: 'from-indigo-500 to-blue-500' },
            { skill: 'Collaboration', emoji: '👥', color: 'from-pink-500 to-red-500' },
            { skill: 'Decision Making', emoji: '⚖️', color: 'from-cyan-500 to-blue-500' },
            { skill: 'Mentoring', emoji: '🎓', color: 'from-emerald-500 to-green-500' },
            { skill: 'Negotiation', emoji: '🤝', color: 'from-violet-500 to-purple-500' },
            { skill: 'Presentation Skills', emoji: '🎤', color: 'from-red-500 to-orange-500' },
            { skill: 'Research Skills', emoji: '🔬', color: 'from-blue-500 to-cyan-500' },
            { skill: 'Self-Motivation', emoji: '🚀', color: 'from-green-500 to-emerald-500' },
            { skill: 'Stress Management', emoji: '🧘', color: 'from-purple-500 to-pink-500' },
            { skill: 'Conflict Resolution', emoji: '🕊️', color: 'from-orange-500 to-red-500' },
            { skill: 'Empathy', emoji: '❤️', color: 'from-pink-500 to-red-500' },
          ].map((item, index) => (
            <motion.div
              key={item.skill}
              className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 border border-gray-700 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                rotateY: 2, 
                scale: 1.01,
                transition: { duration: 0.3, type: "spring", stiffness: 200 }
              }}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    x: [0, 60, 0],
                    y: [0, -30, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-2 h-2 bg-gradient-to-r ${item.color} rounded-full blur-sm`}
                  style={{ left: '20%', top: '30%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-1 h-1 bg-gradient-to-r ${item.color} rounded-full blur-sm`}
                  style={{ right: '25%', bottom: '40%' }}
                />
              </div>

              {/* Animated emoji */}
              <div className="flex justify-center mb-4">
                <motion.div 
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 border-gradient-to-r ${item.color} bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center`}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-2xl group-hover:text-white transition-colors duration-300"
                  >
                    {item.emoji}
                  </motion.div>
                </motion.div>
              </div>

              {/* Skill name */}
              <motion.div 
                className="text-center relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {item.skill}
                </div>
              </motion.div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      )}
      {skillTab === 2 && (
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {[
            { tool: 'v0.dev', emoji: '🤖', color: 'from-purple-500 to-pink-500' },
            { tool: 'Git', emoji: '📝', color: 'from-orange-500 to-red-500' },
            { tool: 'GitHub', emoji: '🐙', color: 'from-gray-500 to-black' },
            { tool: 'VS Code', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
            { tool: 'Figma', emoji: '🎨', color: 'from-purple-500 to-pink-500' },
            { tool: 'Postman', emoji: '📮', color: 'from-orange-500 to-red-500' },
            { tool: 'Notion', emoji: '📓', color: 'from-gray-500 to-black' },
            { tool: 'Vercel', emoji: '▲', color: 'from-black to-gray-500' },
            { tool: 'Netlify', emoji: '🌐', color: 'from-green-500 to-emerald-500' },
            { tool: 'Supabase', emoji: '🗄️', color: 'from-green-500 to-emerald-500' },
            { tool: 'Firebase', emoji: '🔥', color: 'from-orange-500 to-red-500' },
            { tool: 'Trello', emoji: '📋', color: 'from-blue-500 to-cyan-500' },
            { tool: 'Slack', emoji: '💬', color: 'from-purple-500 to-pink-500' },
            { tool: 'Jira', emoji: '🎫', color: 'from-blue-500 to-cyan-500' },
            { tool: 'Discord', emoji: '🎮', color: 'from-purple-500 to-pink-500' },
            { tool: 'Photoshop', emoji: '🖼️', color: 'from-blue-500 to-cyan-500' },
            { tool: 'Illustrator', emoji: '✏️', color: 'from-orange-500 to-red-500' },
            { tool: 'Canva', emoji: '🎭', color: 'from-blue-500 to-cyan-500' },
            { tool: 'Google Analytics', emoji: '📊', color: 'from-orange-500 to-red-500' },
            { tool: 'Search Console', emoji: '🔍', color: 'from-blue-500 to-cyan-500' },
            { tool: 'SEMrush', emoji: '📈', color: 'from-orange-500 to-red-500' },
            { tool: 'Ahrefs', emoji: '🔗', color: 'from-red-500 to-pink-500' },
            { tool: 'Screaming Frog', emoji: '🐸', color: 'from-green-500 to-emerald-500' },
            { tool: 'GTmetrix', emoji: '⚡', color: 'from-yellow-500 to-orange-500' },
            { tool: 'PageSpeed Insights', emoji: '🚀', color: 'from-green-500 to-emerald-500' },
            { tool: 'Lighthouse', emoji: '💡', color: 'from-yellow-500 to-orange-500' },
            { tool: 'Yoast SEO', emoji: '🎯', color: 'from-green-500 to-emerald-500' },
            { tool: 'RankMath', emoji: '📊', color: 'from-purple-500 to-pink-500' },
          ].map((item, index) => (
            <motion.div
              key={item.tool}
              className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 border border-gray-700 rounded-2xl p-4 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.03, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                rotateY: 2, 
                scale: 1.01,
                transition: { duration: 0.3, type: "spring", stiffness: 200 }
              }}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    x: [0, 40, 0],
                    y: [0, -20, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-1 h-1 bg-gradient-to-r ${item.color} rounded-full blur-sm`}
                  style={{ left: '30%', top: '40%' }}
                />
                <motion.div
                  animate={{ 
                    x: [0, -30, 0],
                    y: [0, 30, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                  className={`absolute w-1 h-1 bg-gradient-to-r ${item.color} rounded-full blur-sm`}
                  style={{ right: '30%', bottom: '30%' }}
                />
              </div>

              {/* Animated emoji/icon */}
              <div className="flex justify-center mb-3">
                <motion.div 
                  className={`w-10 h-10 rounded-lg overflow-hidden border-2 border-gradient-to-r ${item.color} bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-lg group-hover:scale-105 transition-all duration-500 flex items-center justify-center`}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-lg group-hover:text-white transition-colors duration-300"
                  >
                    {item.emoji}
                  </motion.div>
                </motion.div>
              </div>

              {/* Tool name */}
              <motion.div 
                className="text-center relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white font-semibold text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {item.tool}
                </div>
              </motion.div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: { title: string; tech: string; image: string; link?: string; description?: string }, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max tilt angle
    const maxTilt = 15;
    const tiltX = ((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    setTilt({ x: tiltX, y: tiltY });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col items-center bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 border border-gray-700 rounded-2xl shadow-2xl px-8 pt-8 pb-6 transition-all duration-500 hover:shadow-[0_20px_60px_0_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer min-h-[380px] overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: index * 0.5,
            ease: "easeInOut"
          }}
          className="absolute w-3 h-3 bg-purple-400 rounded-full blur-sm"
          style={{ left: '20%', top: '30%' }}
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: index * 0.7,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-pink-400 rounded-full blur-sm"
          style={{ right: '25%', bottom: '40%' }}
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -30, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: index * 0.3,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-red-400 rounded-full blur-sm"
          style={{ left: '60%', top: '60%' }}
          />
        </div>

      {/* Animated icon placeholder */}
      <div className="w-full flex justify-center mb-6">
        <motion.div 
          className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-purple-500/30 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 shadow-lg group-hover:scale-110 group-hover:border-purple-400/60 transition-all duration-500 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
          >
            {project.title.includes('PORTFOLIO') ? '🎨' : 
             project.title.includes('E-COMMERCE') ? '🛒' :
             project.title.includes('AI') ? '🤖' :
             project.title.includes('STATIC') ? '🌐' :
             project.title.includes('SEO') ? '📊' :
             project.title.includes('MOBILE') ? '📱' : '💻'}
          </motion.div>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center text-center w-full">
        <motion.h3 
          className="text-xl font-extrabold tracking-tight mb-3 text-white drop-shadow-lg leading-tight min-h-[56px] flex items-center justify-center group-hover:text-purple-300 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <motion.p 
          className="text-gray-300 text-base mb-4 font-mono group-hover:text-gray-200 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {project.tech}
        </motion.p>
        {project.description && (
          <motion.p 
            className="text-gray-400 text-sm mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {project.description}
          </motion.p>
        )}
        {project.link ? (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto px-0 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-base shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer group-hover:shadow-purple-500/50 z-10 relative"
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.link, '_blank', 'noopener,noreferrer');
            }}
          >
            View Project
          </motion.a>
        ) : (
          <motion.button 
            className="w-full mt-auto px-0 py-4 rounded-xl bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold text-base shadow-lg hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            Coming Soon
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
