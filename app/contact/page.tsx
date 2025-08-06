"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, Linkedin, Twitter, ArrowLeft, Phone, MapPin, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import WhatsAppIcon from '../components/WhatsAppIcon'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth < 768;
      const isMobileResult = isMobileDevice || isSmallScreen;
      setIsMobile(isMobileResult);
      
      // Add a class to body for CSS targeting
      if (isMobileResult) {
        document.body.classList.add('mobile-device');
      } else {
        document.body.classList.remove('mobile-device');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll handler for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show scroll-to-top button when scrolled down
      if (currentScrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function for mobile-friendly animations
  const getMobileAnimation = (desktopAnimation: any) => {
    return isMobile ? {} : desktopAnimation;
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enhanced email template with better formatting
      const emailSubject = `Portfolio Contact: ${formData.subject}`
      const emailBody = `
Hello Moaiz,

You have received a new contact message from your portfolio website:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from your portfolio contact form.
      `.trim()

      // Create mailto link with enhanced form data
      const mailtoLink = `mailto:moaizmasud@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      
      // Open default email client
      window.open(mailtoLink, '_blank')
      
      // Simulate success with better timing
      await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

      // Reset form after 8 seconds to give user time to read success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
      }, 8000)
    } catch (error) {
      console.error('Error sending email:', error)
      setIsSubmitting(false)
      alert('There was an error sending your message. Please try again or email me directly at moaizmasud@gmail.com')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Floating particles for contact page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <motion.div
          animate={{ 
            x: [0, 120, 0],
            y: [0, -80, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 10, 
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
            y: [0, 60, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 12, 
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
            duration: 11, 
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
            duration: 9, 
            repeat: Infinity, 
            delay: 4,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full blur-sm"
          style={{ left: '40%', bottom: '25%' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="fixed top-4 left-4 z-50">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors cursor-pointer bg-black/20 backdrop-blur-lg px-4 py-2 rounded-xl border border-white/20 hover:bg-black/30"
              whileHover={getMobileAnimation({ x: -5 })}
            >
              <ArrowLeft size={20} />
              <span className="font-bold text-sm">Back to Portfolio</span>
            </motion.div>
          </Link>
        </header>

        <div className="pt-20 pb-32 px-4 md:px-8 lg:px-16">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background for title */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-3xl" />
            
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-center relative z-10"
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
            GET IN TOUCH
              </motion.span>
          </motion.h1>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Animated background for description */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl blur-2xl" />
            
            <motion.p
              className="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto relative z-10 group-hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
          >
            Have a project in mind? Let's discuss how we can bring your vision to life.
              </motion.span>
          </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-12">
                <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-white to-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/profile.jpg" alt="John Doe" className="w-28 h-28 object-cover rounded-full" />
                </div>
                <h2 className="text-3xl font-black mb-2">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Moaiz</span>
                  <span className="text-white"> Masud</span>
                </h2>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p 
                    className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300"
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
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="text-white" size={24} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:moaizmasud@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                      moaizmasud@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="text-white" size={24} />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+447881395979" className="text-gray-300 hover:text-white transition-colors">
                      +44 7881 395979
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <WhatsAppIcon className="text-white" size={24} />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a href="https://wa.me/447881395979" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                      +44 7881 395979
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="text-white" size={24} />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">London, UK</p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">

                  <motion.a
                    href="https://www.linkedin.com/in/moaiz-masud-461633222/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-white hover:text-black transition-colors"
                    whileHover={getMobileAnimation({ scale: 1.05 })}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    href="https://x.com/chaudharymoaiz1?s=21&t=F1KmXA5Z0-f9prKOcE1nfA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-white hover:text-black transition-colors"
                    whileHover={getMobileAnimation({ scale: 1.05 })}
                  >
                    <Twitter size={24} />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/447881395979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-green-500 hover:text-white transition-colors"
                    whileHover={getMobileAnimation({ scale: 1.05 })}
                  >
                    <WhatsAppIcon size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Send className="text-white" size={32} />
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Email Client Opened!
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Your default email client should have opened with your message. If it didn't open automatically, please email me directly at{' '}
                    <a 
                      href="mailto:moaizmasud@gmail.com" 
                      className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                    >
                      moaizmasud@gmail.com
                    </a>
                  </motion.p>
                  <motion.div
                    className="flex justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.a
                      href="mailto:moaizmasud@gmail.com"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      whileHover={getMobileAnimation({ scale: 1.05 })}
                      whileTap={getMobileAnimation({ scale: 0.95 })}
                    >
                      <Mail size={20} />
                      Email Directly
                    </motion.a>
                    <motion.a
                      href="https://wa.me/447881395979"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
                      whileHover={getMobileAnimation({ scale: 1.05 })}
                      whileTap={getMobileAnimation({ scale: 0.95 })}
                    >
                      <WhatsAppIcon size={20} />
                      WhatsApp
                    </motion.a>
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-sm font-semibold mb-2 text-white">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 hover:border-white/50"
                        placeholder="Your name"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 hover:border-white/50"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-white">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 hover:border-white/50"
                      placeholder="Project inquiry"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-white">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 resize-none hover:border-white/50"
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                    </div>
                  </motion.button>

                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <p className="text-gray-400 mb-3">Or contact me directly via:</p>
                    <div className="flex justify-center gap-4">
                      <motion.a
                        href="mailto:moaizmasud@gmail.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        whileHover={getMobileAnimation({ scale: 1.05 })}
                        whileTap={getMobileAnimation({ scale: 0.95 })}
                      >
                        <Mail size={20} />
                        Email
                      </motion.a>
                      <motion.a
                        href="https://wa.me/447881395979"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
                        whileHover={getMobileAnimation({ scale: 1.05 })}
                        whileTap={getMobileAnimation({ scale: 0.95 })}
                      >
                        <WhatsAppIcon size={20} />
                        WhatsApp
                      </motion.a>
                    </div>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

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
    </div>
  )
}
