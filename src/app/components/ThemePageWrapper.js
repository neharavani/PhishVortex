'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemePageWrapper({ children }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const background = theme === 'dark' ? 'bg-gray-900 text-cyan-400' : 'bg-white text-black';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${background}`}>
      {children}
    </div>
  );
}
