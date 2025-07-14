"use client";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function QuizPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`p-6 flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className={`w-full max-w-4xl p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Quizzes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example quiz card */}
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Phishing Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of phishing attacks.</p>
              <Link href="/quiz/phishing" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Malware Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of malware attacks.</p>
              <Link href="/quiz/malware" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Identity Attack Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of identity attacks.</p>
              <Link href="/quiz/identity" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">MITM Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of man in the middle attacks.</p>
              <Link href="/quiz/man-in-the-middle" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Ransomware Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of Ransomeware attacks.</p>
              <Link href="/quiz/ransomeware" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Social Engineering Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of Social engineering.</p>
              <Link href="/quiz/social" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Spyware Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of spyware attacks.</p>
              <Link href="/quiz/spyware" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Adware Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of Adware attacks.</p>
              <Link href="/quiz/adware" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
            <div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold"> Password Attack Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of Password attacks.</p>
              <Link href="/quiz/password" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div><div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Cryptojacking Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of cryptojacks attacks.</p>
              <Link href="/quiz/cryptojacking" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div><div className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
              <h3 className="text-xl font-semibold">Final Quiz</h3>
              <p className="text-white-600 mt-2">Test your knowledge of attacks.</p>
              <Link href="/quiz/final" className="text-cyan-500 mt-4 block hover:underline">
                Start Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
