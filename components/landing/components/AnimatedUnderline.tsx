"use client";

import { motion } from "framer-motion";

type AnimatedUnderlineProps = {
  isInView: boolean;
};

export default function AnimatedUnderline({ isInView }: AnimatedUnderlineProps) {
  return (
    <motion.div
      className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
      initial={{ width: 0 }}
      animate={isInView ? { width: "100%" } : { width: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}