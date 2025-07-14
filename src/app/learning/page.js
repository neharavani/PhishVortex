"use client";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function LearningPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`p-6 flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className={`w-full max-w-4xl p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Learning Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example module card */}
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Phishing Awareness</h3>
              <p className="text-white-600 mt-2">Learn how to spot phishing attacks.</p>
              <Link href="/learning/phishing-awareness" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Man In The Middle Attack</h3>
              <p className="text-white-600 mt-2">Learn about man in the middle attack.</p>
              <Link href="/learning/man-in-the-middle" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Malware Prevention</h3>
              <p className="text-white-600 mt-2">Learn how to spot malware.</p>
              <Link href="/learning/malware-prevention" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Password Attack</h3>
              <p className="text-white-600 mt-2">Learn how to Password attacks happen.</p>
              <Link href="/learning/password-attack" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Ransomware</h3>
              <p className="text-white-600 mt-2">Learn what is Ransomware.</p>
              <Link href="/learning/ransomware" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Spyware</h3>
              <p className="text-white-600 mt-2">Learn what is Spyware.</p>
              <Link href="/learning/spyware" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Adware</h3>
              <p className="text-white-600 mt-2">Learn what is Adware.</p>
              <Link href="/learning/adware" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Identity Protection</h3>
              <p className="text-white-600 mt-2">Learn how to protect identity.</p>
              <Link href="/learning/identity-protection" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Social Engineering</h3>
              <p className="text-white-600 mt-2">Learn what is social engineering.</p>
              <Link href="/learning/social-engineering" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Cryptojacking</h3>
              <p className="text-white-600 mt-2">Learn what is cryptojacking.</p>
              <Link href="/learning/cryptojacking" className="text-cyan-500 mt-4 block hover:underline">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
