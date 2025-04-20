"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Globe, 
  ShieldCheck, 
  Code, 
  RefreshCw,
  Coins,
  ArrowRight,
  Rocket,
  Star,
  CreditCard,
  Smartphone,
  ArrowLeftRight,
  BarChart3,
  Wallet,
  Gift,
  Landmark
} from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

export default function Page() {
  // Refs for scroll animations
  const containerRef = useRef(null);
  const appsRef = useRef(null);
  const [appsInView, setAppsInView] = useState(false);
  
  // State for active card
  const [activeCard, setActiveCard] = useState(0);
  const cardCount = 6;
  
  // Floating elements animation state
  const [floatingElements, setFloatingElements] = useState([
    { id: 1, icon: CreditCard, x: 15, y: 20, scale: 1, rotation: -5 },
    { id: 2, icon: Smartphone, x: 65, y: 30, scale: 1.2, rotation: 8 },
    { id: 3, icon: Wallet, x: 40, y: 75, scale: 0.9, rotation: -10 },
    { id: 4, icon: Coins, x: 75, y: 60, scale: 1.1, rotation: 6 },
    { id: 5, icon: BarChart3, x: 25, y: 65, scale: 1, rotation: 12 },
    { id: 6, icon: Globe, x: 85, y: 20, scale: 0.8, rotation: -8 }
  ]);
  
  // Check when apps section enters viewport
  useEffect(() => {
    if (!appsRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAppsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(appsRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Auto-rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cardCount);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animate floating elements
  useEffect(() => {
    if (!appsInView) return;
    
    const interval = setInterval(() => {
      setFloatingElements(prev => 
        prev.map(el => ({
          ...el,
          x: el.x + (Math.random() * 4 - 2),
          y: el.y + (Math.random() * 4 - 2),
          rotation: el.rotation + (Math.random() * 2 - 1)
        }))
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, [appsInView]);
  
  // App cards data with modern gradients
  const appCards = [
    {
      title: "Payment Solutions",
      description: "Build lightning-fast payment apps with near-zero fees",
      icon: CreditCard,
      examples: ["Payment Gateways", "Point of Sale", "Subscription Billing"],
      color: "from-blue-500/90 to-indigo-500/70",
      textColor: "text-white"
    },
    {
      title: "Digital Banking",
      description: "Create accessible banking solutions for everyone",
      icon: Landmark,
      examples: ["Savings Apps", "Mobile Banks", "Investment Platforms"],
      color: "from-emerald-500/90 to-cyan-500/70",
      textColor: "text-white"
    },
    {
      title: "Trading Platforms",
      description: "Build exchanges for digital assets with instant settlement",
      icon: BarChart3,
      examples: ["DEXs", "Asset Exchanges", "Trading Bots"],
      color: "from-purple-500/90 to-fuchsia-500/70",
      textColor: "text-white"
    },
    {
      title: "Money Transfer",
      description: "Enable global money movement without traditional barriers",
      icon: ArrowLeftRight,
      examples: ["Remittance Apps", "Cross-border Payments", "Currency Exchange"],
      color: "from-amber-500/90 to-orange-500/70",
      textColor: "text-white"
    },
    {
      title: "Tokenization",
      description: "Create and manage digital assets representing real value",
      icon: Coins,
      examples: ["Loyalty Programs", "Digital Collectibles", "Asset Tokenization"],
      color: "from-pink-500/90 to-rose-500/70",
      textColor: "text-white"
    },
    {
      title: "Financial Tools",
      description: "Build specialized tools for specific financial needs",
      icon: Wallet,
      examples: ["Microlending", "Crowdfunding", "Donation Systems"],
      color: "from-cyan-500/90 to-sky-500/70",
      textColor: "text-white"
    }
  ];

  // Updated benefits with Soroban/Rust confirmation
  const benefits = [
    {
      title: "Lightning Speed",
      description: "3-5 second finality for all transactions globally",
      icon: Zap,
      details: "Process 1000s of transactions per second with consistent performance"
    },
    {
      title: "Smart Contracts",
      description: "Rust-based Soroban contracts for financial logic",
      icon: Code,
      details: "Secure, scalable smart contract platform using WebAssembly"
    },
    {
      title: "Bank-Grade Security",
      description: "Enterprise-level security without the complexity",
      icon: ShieldCheck,
      details: "Immutable ledger with multi-signature support and transparent operations"
    },
    {
      title: "Global By Default",
      description: "Reach users anywhere without additional integration",
      icon: Globe,
      details: "Built-in currency exchange and borderless transaction capabilities"
    },
    {
      title: "Eco-Friendly",
      description: "Minimal energy consumption compared to other blockchains",
      icon: RefreshCw,
      details: "Carbon-neutral network with minimal energy footprint"
    },
    {
      title: "Asset Creation",
      description: "Issue custom tokens with just a few lines of code",
      icon: Coins,
      details: "Create branded tokens for rewards, ownership, or creative use cases"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section - Modern Design Update */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Gradient background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
            <motion.div 
              className="w-full lg:w-1/2 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                <Star className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Stellar Ecosystem</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Build Next-Gen<br/>Financial Apps
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Leverage Stellar's blockchain with Soroban smart contracts to create borderless financial solutions.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary backdrop-blur-sm">
                  Explore Projects
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative h-[400px] w-full">
                {/* Animated Stellar Core */}
                <motion.div 
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-lg flex items-center justify-center border border-primary/20 shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-md flex items-center justify-center">
                      <Star className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements with Glassmorphism */}
                {floatingElements.map((item) => (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      zIndex: item.y > 50 ? 30 : 5
                    }}
                    animate={{
                      x: [0, item.x % 10 - 5, 0],
                      y: [0, item.y % 8 - 4, 0],
                      rotate: [item.rotation, item.rotation + 5, item.rotation],
                      scale: [item.scale, item.scale * 1.05, item.scale]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-lg flex items-center justify-center border border-primary/20 shadow-lg`}>
                      <item.icon className="h-8 w-8 text-primary/90" />
                    </div>
                  </motion.div>
                ))}

                {/* Dynamic Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {floatingElements.map((item, index) => (
                    <motion.line
                      key={`line-${index}`}
                      x1="50%"
                      y1="50%"
                      x2={`${item.x + 8}%`}
                      y2={`${item.y + 8}%`}
                      stroke="rgba(99, 102, 241, 0.2)"
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Apps Section */}
      <section 
        className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden" 
        ref={appsRef}
      >
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Financial Applications</h2>
              <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Build on Stellar's platform with Rust-based Soroban smart contracts for enterprise-grade solutions
              </p>
            </motion.div>
          </div>
          
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            {/* Modern Card Carousel */}
            <div className="w-full lg:w-3/5">
              <div className="h-[520px] relative">
                <AnimatePresence>
                  {appCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      className={`absolute w-full h-full ${
                        index === activeCard ? 'z-20' : 'z-10'
                      }`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ 
                        opacity: index === activeCard ? 1 : 0,
                        x: index === activeCard ? 0 : 100,
                        scale: index === activeCard ? 1 : 0.95
                      }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: "easeInOut" 
                      }}
                    >
                      <div className={`h-full w-full rounded-2xl bg-gradient-to-br ${card.color} backdrop-blur-lg border border-white/20 p-8 shadow-2xl overflow-hidden relative`}>
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                        
                        <div className="flex flex-col h-full relative z-10">
                          <div className="mb-6">
                            <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                              <card.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{card.title}</h3>
                            <p className="text-lg text-white/90">{card.description}</p>
                          </div>
                          
                          <div className="mt-auto">
                            <div className="mb-4 border-t border-white/20 pt-6">
                              <h4 className="text-lg font-medium text-white mb-3">Use Cases:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {card.examples.map((example, i) => (
                                  <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-white flex items-center hover:bg-white/30 transition-all">
                                    <div className="w-2 h-2 rounded-full bg-white mr-3"></div>
                                    <span>{example}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <Button className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-lg border border-white/20">
                                Explore <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                              
                              <div className="flex gap-2">
                                {appCards.map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setActiveCard(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                      i === activeCard ? 'bg-white scale-150' : 'bg-white/30 scale-100'
                                    }`}
                                    aria-label={`Go to card ${i + 1}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Enhanced Side Content */}
            <div className="w-full lg:w-2/5 space-y-8">
              <motion.div
                className="bg-card/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Soroban Smart Contracts</h3>
                    <p className="text-muted-foreground">
                      Develop secure financial logic using Rust-based smart contracts on Stellar's Soroban platform.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">Rust SDK</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">WASM Support</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">Testnet Access</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">CLI Tools</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-card/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Enterprise Ready</h3>
                    <p className="text-muted-foreground mb-4">
                      Stellar meets financial industry standards with ISO 27001 certification and SOC 2 compliance.
                    </p>
                    <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30 backdrop-blur-sm border border-primary/20">
                      Security Overview
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-24 relative bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Build on Stellar?</h2>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Enterprise-grade blockchain infrastructure for financial innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="h-full bg-card/80 backdrop-blur-lg border border-primary/20 rounded-xl p-6 shadow-lg overflow-hidden transition-all hover:border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col h-full relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {benefit.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-primary/10 group-hover:border-primary/20 transition-colors">
                      <p className="text-sm text-muted-foreground/80">
                        {benefit.details}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-20 bg-gradient-to-t from-primary/10 to-background">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            className="bg-card/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
            
            <div className="relative flex flex-col md:flex-row gap-12 items-center justify-between">
              <div className="w-full md:w-2/3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20 backdrop-blur-sm">
                  <Rocket className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Launch Your Project</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Build the Future of Finance</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Access funding, tools, and support to bring your financial innovation to life on Stellar.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30">
                    Apply for Funding <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary backdrop-blur-sm">
                    Developer Docs
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-lg border border-primary/20 shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="h-16 w-16 text-primary animate-pulse" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}