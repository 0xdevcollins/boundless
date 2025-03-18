"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedUnderline from "../components/AnimatedUnderline";
import PageTransition from "../components/PageTransition";

const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Project Creator",
    quote: "Boundless provided the perfect platform to validate, fund, and develop my DeFi protocol. The community feedback was invaluable, and the milestone-based funding gave our backers confidence.",
    image: "/api/placeholder/100/100",
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Investor & Backer",
    quote: "As someone who invests in blockchain projects, I appreciate the transparency Boundless provides. Being able to vote on milestone completions and track progress gives me confidence in my investments.",
    image: "/api/placeholder/100/100",
  },
  {
    id: 3,
    name: "Nadia Williams",
    role: "Blockchain Developer",
    quote: "The community on Boundless is amazing! I received constructive feedback that helped refine my project, and the milestone-based funding allowed me to focus on building without financial stress.",
    image: "/api/placeholder/100/100",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Early Adopter",
    quote: "I've backed several projects on Boundless and have been impressed with the accountability. The Stellar integration makes transactions fast and inexpensive, and I love seeing my investments grow.",
    image: "/api/placeholder/100/100",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + itemsPerView >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - itemsPerView : prevIndex - 1
    );
  };

  // Get visible testimonials based on active index
  const visibleTestimonials = [];
  for (let i = 0; i < itemsPerView; i++) {
    const index = (activeIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <PageTransition> {/* Wrap the entire section with PageTransition */}
      <section className="py-20 bg-background" ref={ref}>
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                What People Say About Boundless
              </h2>
              <AnimatedUnderline isInView={isInView} />
            </div>
            <p className="text-lg text-muted-foreground mt-6">
              Join our growing community of creators and backers
            </p>
          </motion.div>

          <div className="relative">
            {/* Control buttons */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full border bg-background/80 backdrop-blur-sm hover:bg-muted"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full border bg-background/80 backdrop-blur-sm hover:bg-muted"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Testimonial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden px-8">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <Quote className="text-primary h-6 w-6 mr-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="flex items-center mt-6">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      {/* Hover Indicator */}
                      <motion.div
                        className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        initial={{ opacity: 0 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination indicator */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-2 h-2 rounded-full mx-1 p-0 min-w-0 ${
                    index >= activeIndex && index < activeIndex + itemsPerView
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}