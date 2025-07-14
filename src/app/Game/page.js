"use client";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function gamePage() {
  const { theme } = useTheme();

  const cardContent = [
    {
      title: "Phish or Not",
      desc: "Play and test your phishing detection skills.",
      link: "/Game/PhishorNot",
    },
    {
      title: "Phishing Hunt",
      desc: "Play and test your detection skills.",
      link: "/Game/PhishingHunt",
    },
    {
      title: "Speedify",
      desc: "Play and test your cybersecurity skills.",
      link: "/Game/Speedify",
    },
    {
      title: "Password Strength",
      desc: "Play and test your password difficulty.",
      link: "/Game/PasswordStrength",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-6 flex items-center justify-center ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`w-full max-w-4xl p-6 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Games</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cardContent.map(({ title, desc, link }) => (
              <div
                key={title}
                className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${
                  theme === "dark"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {desc}
                </p>
                <Link
                  href={link}
                  className="text-cyan-500 mt-4 block hover:underline"
                >
                  Play Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
