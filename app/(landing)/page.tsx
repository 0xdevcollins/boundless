'use client';

import AboutUs from "@/components/landing/sections/about-us";
import CTA from "@/components/landing/sections/cta";
import ExploreProjects from "@/components/landing/sections/explore-projects";
import Hero from "@/components/landing/sections/hero";
import HowItWorks from "@/components/landing/sections/how-it-works";
import Testimonials from "@/components/landing/sections/testimonials";
import UsAndStellar from "@/components/landing/sections/us-and-stellar";
import React from "react";

export default function LandingPage() {
	return (
		<div className="min-h-screen">
			<main>
				<Hero />
				<AboutUs />
				<HowItWorks />
				<ExploreProjects />
				<UsAndStellar />
				<Testimonials />
				<CTA />
			</main>
		</div>
	);
}
