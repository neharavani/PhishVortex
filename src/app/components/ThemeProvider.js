"use client";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function ClientThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {mounted ? children : null}
    </ThemeProvider>
  );
}
