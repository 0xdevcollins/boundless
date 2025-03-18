"use client";

import React from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Hero from "@/components/landing/sections/hero";
import ExploreProjects from "@/components/landing/sections/explore-projects";
import HowItWorks from "@/components/landing/sections/how-it-works";
import AboutUs from "@/components/landing/sections/about-us";
import Testimonials from "@/components/landing/sections/testimonials";
import UsAndStellar from "@/components/landing/sections/us-and-stellar";
import CTA from "@/components/landing/sections/cta"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <HowItWorks />
        <ExploreProjects/>
        <UsAndStellar/>
        <Testimonials/>
        <CTA/>
      </main>
      <Footer/>
    </div>
  );
}