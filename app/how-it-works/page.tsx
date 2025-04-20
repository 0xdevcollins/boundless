"use client";

import React from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { 
  Lightbulb, 
  Users, 
  Vote, 
  BarChart4, 
  Banknote, 
  CheckCircle,
  Star,
  Sparkles,
  Rocket,
  Zap,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Animated Gradients */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Exclusively for Stellar Projects</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              How Boundless Works
            </h1>
            
            <div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-8"></div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-10">
              From idea to reality: Our community-powered funding platform for innovative projects.
            </p>
            
            <div className="flex flex-wrap gap-5 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]">
                <Rocket className="mr-2 h-5 w-5" /> Launch Your Project
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px]">
                <Globe className="mr-2 h-5 w-5" /> Explore Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stellar Banner - More Prominent */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="rounded-2xl border border-primary/20 bg-card/70 shadow-lg p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-md">
                      <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    <Zap className="h-3 w-3" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Built Exclusively for Stellar</h3>
                  <p className="text-muted-foreground">We're dedicated to supporting innovations in the Stellar ecosystem</p>
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">Learn About Stellar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps - More Dynamic */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pattern-dots pattern-bg-white pattern-size-4 pattern-primary"></div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Zap className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">The Boundless Journey</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              A proven pathway to bring Stellar innovations to life
            </p>
          </div>

          {/* Steps - Card Hover Effects */}
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-1/4 relative">
                <div className="sticky top-24 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-primary/20 rotate-3">1</div>
                  <h3 className="text-2xl font-bold mb-3">Submit Your Idea</h3>
                  <p className="text-muted-foreground max-w-xs">Share your innovative vision</p>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Lightbulb className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Start with your inspiration</p>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed">Tell us about your project idea. We'll guide you through outlining your concept, setting realistic goals, and showcasing why your innovation matters.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Guided submission templates</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Add descriptive media</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Technical validation</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Technical integration support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-1/4 relative">
                <div className="sticky top-24 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-primary/20 -rotate-3">2</div>
                  <h3 className="text-2xl font-bold mb-3">Community Feedback</h3>
                  <p className="text-muted-foreground max-w-xs">Get valuable insights from experts</p>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Refine with community wisdom</p>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed">Our community of developers, investors, and enthusiasts provides feedback to help strengthen your project. Learn what resonates, what needs improvement, and how to maximize your project's impact.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Direct expert conversations</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Moderated discussion boards</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Technical mentors</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Market validation insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-1/4 relative">
                <div className="sticky top-24 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-primary/20 rotate-3">3</div>
                  <h3 className="text-2xl font-bold mb-3">Community Voting</h3>
                  <p className="text-muted-foreground max-w-xs">Let the community discover your vision</p>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Vote className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Win community support</p>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed">Projects are voted on by our community of supporters. This democratic process ensures quality projects stand out and demonstrates genuine interest in what you're building.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Transparent voting system</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Sybil-resistant protection</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>XLM-weighted voting</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Real-time voting analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-1/4 relative">
                <div className="sticky top-24 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-primary/20 -rotate-3">4</div>
                  <h3 className="text-2xl font-bold mb-3">Set Milestones</h3>
                  <p className="text-muted-foreground max-w-xs">Break your journey into achievable steps</p>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <BarChart4 className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Chart your development path</p>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed">Break your project into 3-12 achievable milestones based on your project's scope. Each completed milestone unlocks funding to sustain your development and momentum.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Flexible milestone planning</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Interactive timeline tools</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Clear delivery criteria</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Technical validation points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-1/4 relative">
                <div className="sticky top-24 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-primary/20 rotate-3">5</div>
                  <h3 className="text-2xl font-bold mb-3">Secure Funding</h3>
                  <p className="text-muted-foreground max-w-xs">Get backed by the community</p>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Banknote className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Get the resources you need</p>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed">Launch your funding campaign and collect support from people who believe in your vision. Our platform makes transactions safe, fast, and transparent.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>XLM and USDC support</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Fraud-resistant system</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Stellar smart contracts</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Real-time funding dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-1/4 relative">
                <div className="sticky top-24 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-primary/20 -rotate-3">6</div>
                  <h3 className="text-2xl font-bold mb-3">Build & Deliver</h3>
                  <p className="text-muted-foreground max-w-xs">Bring your innovation to life</p>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl border border-primary/10 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Rocket className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Make your vision reality</p>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed">Start building your project! As you complete each milestone, funding is automatically released to your wallet. Keep your backers engaged with regular progress updates and demonstrations.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Automatic milestone payments</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Verified technical deliverables</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Builder update tools</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Ongoing technical support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - More Interactive */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Questions Answered</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6"></div>
            <p className="text-muted-foreground">
              Everything you need to know about building with Boundless
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">How long does it take to submit a project?</h3>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 group-open:rotate-45 transition-transform duration-300">
                    <span className="block w-4 h-0.5 bg-primary absolute"></span>
                    <span className="block w-0.5 h-4 bg-primary absolute group-open:opacity-0 transition-opacity"></span>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-muted-foreground bg-gradient-to-b from-transparent to-primary/5">
                  <p className="leading-relaxed">Most creators complete the submission process in under an hour. Our specialized templates make it easy to include all the important information and technical details about your project.</p>
                </div>
              </details>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">What happens if my project doesn't get enough votes?</h3>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 group-open:rotate-45 transition-transform duration-300">
                    <span className="block w-4 h-0.5 bg-primary absolute"></span>
                    <span className="block w-0.5 h-4 bg-primary absolute group-open:opacity-0 transition-opacity"></span>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-muted-foreground bg-gradient-to-b from-transparent to-primary/5">
                  <p className="leading-relaxed">Don't worry! You can update your project based on the community feedback and resubmit it after 14 days. Many successful projects weren't approved on their first submission. Our mentors will help you refine your approach to better resonate with the community.</p>
                </div>
              </details>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">How many milestones should my project have?</h3>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 group-open:rotate-45 transition-transform duration-300">
                    <span className="block w-4 h-0.5 bg-primary absolute"></span>
                    <span className="block w-0.5 h-4 bg-primary absolute group-open:opacity-0 transition-opacity"></span>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-muted-foreground bg-gradient-to-b from-transparent to-primary/5">
                  <p className="leading-relaxed">Your project can have between 3 to 12 milestones depending on its complexity and scope. Larger technical builds usually need more milestones, while smaller apps or integrations might only need 3-5. Each milestone should represent meaningful progress in your project's development journey and include specific technical deliverables.</p>
                </div>
              </details>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">What currencies does Boundless accept?</h3>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 group-open:rotate-45 transition-transform duration-300">
                    <span className="block w-4 h-0.5 bg-primary absolute"></span>
                    <span className="block w-0.5 h-4 bg-primary absolute group-open:opacity-0 transition-opacity"></span>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-muted-foreground bg-gradient-to-b from-transparent to-primary/5">
                  <p className="leading-relaxed">We support XLM (Stellar Lumens) and USDC on Stellar. Projects building on Stellar can also accept custom Stellar assets. Using the Stellar network means transactions are fast, secure, and have minimal fees.</p>
                </div>
              </details>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">Does Boundless support projects outside the Stellar ecosystem?</h3>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 group-open:rotate-45 transition-transform duration-300">
                    <span className="block w-4 h-0.5 bg-primary absolute"></span>
                    <span className="block w-0.5 h-4 bg-primary absolute group-open:opacity-0 transition-opacity"></span>
                  </div>
                </summary>
                <div className="p-6 pt-0 text-muted-foreground bg-gradient-to-b from-transparent to-primary/5">
                  <p className="leading-relaxed">Boundless is dedicated exclusively to supporting projects building on the Stellar ecosystem. We specialize in helping developers who are creating applications, services, tools, and infrastructure that enhance and expand Stellar's capabilities and adoption.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - More Dynamic */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/5 via-card to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
            
            <div className="relative flex flex-col md:flex-row gap-10 items-center justify-between">
              <div className="w-full md:w-2/3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
                  <Rocket className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Ready for Liftoff?</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Launch Your Project</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join our community of innovators and bring your vision to life with backing from people who believe in building the future.
                </p>
                
                <div className="flex flex-wrap gap-6">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-6 text-lg">
                    <Rocket className="mr-2 h-5 w-5" /> Start Your Project
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary/50 px-8 py-6 text-lg">
                    <Globe className="mr-2 h-5 w-5" /> Explore Projects
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                {/* Stellar-themed decoration */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
                    <div className="w-16 h-16 relative">
                      {/* Stylized Stellar-inspired logo */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Star className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s" }}>
                        <div className="h-3 w-3 bg-primary rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                        <div className="h-3 w-3 bg-primary/60 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
                        <div className="h-3 w-3 bg-primary/40 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                        <div className="h-3 w-3 bg-primary/20 rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}