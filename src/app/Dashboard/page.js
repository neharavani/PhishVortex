"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

// Sidebar Links
const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Learning", href: "/learning" },
  { name: "Games", href: "/Game" },
  { name: "Quizzes", href: "/quiz" },
  { name: "Logout", href: "/auth/logout" },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const [activeLink, setActiveLink] = useState("/dashboard");

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Sidebar */}
      <div
        className={`w-64 shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          }`}
      >
        <div
          className={`p-6 text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"
            }`}
        >
          PhishVortex
        </div>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block p-4 text-lg font-medium rounded-md ${activeLink === link.href
                    ? theme === "dark"
                      ? "bg-cyan-500 text-black"
                      : "bg-cyan-600 text-black"
                    : theme === "dark"
                      ? "hover:bg-cyan-700 text-white"
                      : "hover:bg-cyan-400 text-black"
                    }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>


      {/* Main Content */}
      <div className={`flex-1 p-6 flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className={`p-6 rounded-lg shadow-lg w-full max-w-4xl ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome to PhishVortex Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-center">

            {[
              {
                title: "Learning Modules",
                desc: "Start your learning journey here.",
                href: "/learning",
              },
              {
                title: "Games",
                desc: "Play engaging games.",
                href: "/Game",
              },
              {
                title: "Quizzes",
                desc: "Test your knowledge with quizzes.",
                href: "/quiz",
              },
              {
                title: "Logout",
                desc: "Securely log out from the platform.",
                href: "/auth/logout",
              },
            ].map(({ title, desc, href }) => (
              <div
                key={title}
                className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{desc}</p>
                <Link href={href} className="text-cyan-500 mt-4 block hover:underline">
                  {title === "Logout" ? "Logout" : `Go to ${title.split(" ")[0]}`}
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div >
  );
}
