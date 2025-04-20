"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Lightbulb,
  Users,
  Vote,
  BarChart4,
  Banknote,
  CheckCircle,
  Sparkles,
  Share2,
  Shield,
  Clock,
  Globe,
  Zap,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import AnimatedUnderline from "../components/AnimatedUnderline";

type FeatureItem = {
  text: string;
  icon: React.ElementType;
};

type StepDetails = {
  longDescription: string;
  features: FeatureItem[];
};

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: StepDetails;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Submit Your Idea",
    description: "Share your innovative project or creative vision with our global community.",
    icon: Lightbulb,
    details: {
      longDescription:
        "Transform your creative vision into reality by submitting your project idea to Boundless. Our intuitive submission process lets you outline your concept, define your goals, and showcase your passion to potential backers worldwide.",
      features: [
        { text: "Simple submission process", icon: Sparkles },
        { text: "Multimedia project pitches", icon: Share2 },
        { text: "Automatic plagiarism checks", icon: Shield },
        { text: "Guided template assistance", icon: Zap },
      ],
    },
  },
  {
    id: 2,
    title: "Community Feedback",
    description: "Receive valuable feedback from the community to refine your concept.",
    icon: Users,
    details: {
      longDescription:
        "Tap into the collective wisdom of our diverse community to refine and enhance your project. Early feedback helps identify opportunities for improvement, market fit, and potential collaborations that can strengthen your offering.",
      features: [
        { text: "Direct creator-backer dialogue", icon: Users },
        { text: "Collaborative suggestion boards", icon: Share2 },
        { text: "Expert mentor connections", icon: Sparkles },
        { text: "Idea validation from target audience", icon: CheckCircle },
      ],
    },
  },
  {
    id: 3,
    title: "Community Voting",
    description: "Get your project validated through community voting.",
    icon: Vote,
    details: {
      longDescription:
        "Projects on Boundless undergo democratic validation through our transparent voting system. Community support signals project viability and helps quality initiatives stand out, ensuring only the most promising ideas proceed to funding.",
      features: [
        { text: "Transparent voting mechanisms", icon: Shield },
        { text: "Sybil-resistant verification", icon: CheckCircle },
        { text: "Token-weighted governance", icon: Vote },
        { text: "Visible supporter statistics", icon: BarChart4 },
      ],
    },
  },
  {
    id: 4,
    title: "Set Milestones",
    description: "Define clear milestones for transparent project development.",
    icon: BarChart4,
    details: {
      longDescription:
        "Break your project into achievable milestones with clear deliverables and timelines. This structured approach creates accountability, helps backers understand progress, and enables milestone-based fund releases.",
      features: [
        { text: "Customizable milestone templates", icon: Sparkles },
        { text: "Time-based delivery tracking", icon: Clock },
        { text: "Verifiable completion criteria", icon: CheckCircle },
        { text: "Automated progress updates", icon: Zap },
      ],
    },
  },
  {
    id: 5,
    title: "Secure Funding",
    description: "Raise funds from backers interested in your project's success.",
    icon: Banknote,
    details: {
      longDescription:
        "Once your project is validated and milestones are set, launch your funding campaign to the Boundless community. Our blockchain-powered platform ensures secure transactions, transparent fund management, and global accessibility.",
      features: [
        { text: "Multiple cryptocurrency options", icon: Globe },
        { text: "Fraud-protected transactions", icon: Shield },
        { text: "Smart contract escrow", icon: Zap },
        { text: "Real-time funding dashboard", icon: BarChart4 },
      ],
    },
  },
  {
    id: 6,
    title: "Build & Deliver",
    description: "Develop your project with milestone-based fund releases.",
    icon: CheckCircle,
    details: {
      longDescription:
        "As you complete each milestone, funds are automatically released through our smart contracts. This innovative approach ensures creators maintain momentum while giving backers confidence that their support is being used effectively.",
      features: [
        { text: "Automatic fund distribution", icon: Zap },
        { text: "Backer-verified deliverables", icon: CheckCircle },
        { text: "Regular progress updates", icon: Clock },
        { text: "Community-supported development", icon: Users },
      ],
    },
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  // Auto-rotate steps every 5 seconds if not hovering
  useEffect(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);

    if (!isHovering) {
      autoPlayRef.current = setTimeout(() => {
        setActiveStep((prev) => (prev === steps.length ? 1 : prev + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [activeStep, isHovering]);

  const handleStepClick = (id: number) => {
    setActiveStep(id);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const currentStep = steps.find((step) => step.id === activeStep);

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background" ref={ref}>
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                How Boundless Works
              </h2>
              <AnimatedUnderline isInView={isInView} />
            </div>
            <p className="text-lg text-muted-foreground mt-6">
              Reimagining what's possible through democratic funding, milestone-driven development,
              and blockchain-secured transactions
            </p>
          </motion.div>

          {/* Mobile View - Show Numbers First */}
          <div className="md:hidden mb-8">
            <div className="flex justify-center flex-wrap gap-3">
              {steps.map((step) => (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium
                    transition-all duration-300 ease-in-out
                    ${step.id === activeStep
                      ? "bg-primary text-primary-foreground shadow-md scale-110"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.id}
                </motion.button>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Step Numbers on the Left (Hidden on Mobile) */}
            <div className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1 hidden md:block">
              <div className="relative h-full">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                {steps.map((step) => (
                  <motion.div
                    key={step.id}
                    className="relative mb-8 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: step.id * 0.1 }}
                  >
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className={`flex items-center w-full group transition-all duration-300`}
                    >
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium z-10
                          transition-all duration-300 ease-in-out
                          ${step.id === activeStep
                            ? "bg-primary text-primary-foreground shadow-md scale-110"
                            : "bg-muted text-muted-foreground"
                          }
                        `}
                      >
                        {step.id}
                      </div>

                      <div
                        className={`
                          ml-4 py-2 transition-all duration-300
                          ${step.id === activeStep ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
                        `}
                      >
                        <h4
                          className={`font-medium text-lg truncate ${step.id === activeStep ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {step.title}
                        </h4>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content on the Right */}
            <div className="w-full md:w-2/3 lg:w-3/4 order-1 md:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm h-full"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {currentStep?.icon && <currentStep.icon className="h-7 w-7 text-primary" />}
                    </div>
                    <h3 className="text-2xl font-semibold">{currentStep?.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-lg mb-6">
                    {currentStep?.details.longDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentStep?.details.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <span>Step {activeStep} of {steps.length}</span>
                      <div className="w-16 h-1 bg-muted ml-3 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 5,
                            ease: "linear",
                            repeat: isHovering ? 0 : 1,
                            repeatType: "loop",
                          }}
                        />
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}