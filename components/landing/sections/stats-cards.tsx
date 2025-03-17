"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Users, Rocket, Award } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Total Funding",
      value: "$12.7M",
      description: "Raised across all projects",
      icon: <Coins className="h-6 w-6 text-emerald-500" />,
      suffix: "+",
    },
    {
      title: "Active Users",
      value: "23,500",
      description: "Growing community",
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      suffix: "+",
    },
    {
      title: "Projects Launched",
      value: "354",
      description: "Successful campaigns",
      icon: <Rocket className="h-6 w-6 text-emerald-500" />,
      suffix: "",
    },
    {
      title: "Success Rate",
      value: "87",
      description: "Projects meeting goals",
      icon: <Award className="h-6 w-6 text-emerald-500" />,
      suffix: "%",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Impact on the Stellar Ecosystem</h2>
          <p className="text-muted-foreground mt-2 md:text-lg">
            Empowering creators and backers through transparent blockchain funding
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-sm hover:shadow transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="rounded-lg bg-emerald-100/30 dark:bg-emerald-900/20 p-2">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100/30 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                      Stellar Blockchain
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-medium text-muted-foreground">{stat.title}</h3>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-2xl font-bold text-emerald-600 ml-1">{stat.suffix}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}