"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import PageTransition from "../components/PageTransition";
import AnimatedUnderline from "../components/AnimatedUnderline";

const projects = [
  {
    id: 1,
    title: "Stellar Payment Gateway",
    category: "Finance",
    description: "A seamless payment solution built on Stellar for global transactions.",
    funding: 85,
    backers: 237,
    daysLeft: 12,
    icon: Globe,
  },
  {
    id: 2,
    title: "DeStorage: Decentralized Cloud",
    category: "Storage",
    description: "Encrypted, decentralized storage solution powered by Stellar.",
    funding: 62,
    backers: 189,
    daysLeft: 23,
    icon: Zap,
  },
  {
    id: 3,
    title: "AI Trading Bot for Stellar",
    category: "AI & Finance",
    description: "Automated trading strategies using machine learning algorithms.",
    funding: 93,
    backers: 412,
    daysLeft: 5,
    icon: Sparkles,
  },
  {
    id: 4,
    title: "StellaScan: Blockchain Explorer",
    category: "Developer Tools",
    description: "A comprehensive explorer for the Stellar blockchain ecosystem.",
    funding: 71,
    backers: 156,
    daysLeft: 19,
    icon: Users,
  },
];

export default function TrendingProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background" ref={ref}>
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                Trending Projects
              </h2>
              <AnimatedUnderline isInView={isInView} />
            </div>
            <p className="text-lg text-muted-foreground mt-6">
              Discover innovative projects from our community of creators building on blockchain
              technology
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border border-border">
                  <CardHeader className="pb-2 relative">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                        {project.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className={project.daysLeft <= 5 ? "text-amber-500" : ""}>
                          {project.daysLeft} days left
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mt-4">
                      <project.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mt-4">{project.title}</h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-6">
                      <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.funding}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <div className="flex items-center">
                          {project.funding >= 80 && (
                            <Sparkles className="h-3.5 w-3.5 text-amber-500 mr-1" />
                          )}
                          <span className={project.funding >= 80 ? "font-medium" : ""}>
                            {project.funding}% funded
                          </span>
                        </div>
                        <span>{project.backers} backers</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full group relative overflow-hidden"
                      variant={project.funding >= 80 ? "default" : "outline"}
                    >
                      <Link href={`/projects/${project.id}`} className="w-full flex items-center justify-center">
                        View project
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/50"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="outline" className="group">
              <Link href="/explore" className="flex items-center">
                View all projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}