"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme-storage");
    if (savedTheme) {
      try {
        const { state } = JSON.parse(savedTheme);
        if (state.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error parsing theme from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Update theme class when theme changes
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
} 
