'use client';

import { useTheme } from 'next-themes';

export default function ThemeCard({ children, className = '' }) {
  const { theme } = useTheme();

  const baseStyle = 'card p-6 rounded-2xl shadow-lg transition-colors duration-300';
  const darkStyle = 'bg-gray-800 text-gray-300';
  const lightStyle = 'bg-gray-100 text-gray-700';

  const themeClass = theme === 'dark' ? darkStyle : lightStyle;

  return (
    <div className={`${baseStyle} ${themeClass} ${className}`}>
      {children}
    </div>
  );
}
