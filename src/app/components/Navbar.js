"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 relative">
      {/* Left - Logo */}
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        PhishVortex
      </div>

      {/* Center - Navigation Links */}
      <div className="space-x-6 hidden md:flex">
        <Link href="/Dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <Link href="/search" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          Search
        </Link>
        <Link href="/aboutme" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          About Me
        </Link>
      </div>

      {/* Right - Search, Theme Toggle & Auth Buttons */}
      <div className="flex items-center space-x-4">
        {/* Search Button - Visible when search is closed */}
        {!isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Open search"
          >
            <Search size={20} />
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle theme"
        >
          {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <Moon size={20} />}
        </button>

        {/* Auth Buttons */}
        <Link href="/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Login
        </Link>
        <Link href="/auth/signup" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white">
          Sign Up
        </Link>
      </div>

      {/* Search Overlay - Appears when search is open */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 shadow-md z-50 border-b border-gray-300 dark:border-gray-700 flex items-center">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex">
            <input
              type="text"
              placeholder="Search PhishVortex..."
              className="w-full p-2 rounded-l border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
            >
              Search
            </button>
          </form>
          <button 
            className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </nav>
  );
}