"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function PhishingAwarenessPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent mismatch + wait for theme

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-cyan-400" : "bg-white text-black"
      }`}
    >
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">
        {/* Educational Video Section */}
        <div
          className={`card p-6 w-full md:w-3/4 rounded-2xl shadow-lg transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="\videos\Video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* What is Phishing Section */}
        <div
          className={`card p-6 w-full md:w-3/4 rounded-2xl shadow-lg transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Phishing?</h2>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
          Phishing is a deceptive cyber attack where fraudsters impersonate legitimate entities, such as banks, social media platforms, or government agencies, to manipulate individuals into revealing sensitive information like passwords, credit card details, or personal data.
          </p>
        </div>

        {/* Types of Phishing Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of Phishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Phishing Email", desc: "Phishing emails are fake messages that look like they're from trusted sources like your bank, a government agency, or a well-known company. They usually trick you into clicking a harmful link or sharing personal details like passwords or card numbers." },
              { title: "Spear Phishing", desc: "Unlike general phishing, spear phishing targets specific individuals or companies. The attacker often gathers personal info about the target to make the message look more convincing and trustworthy." },
              { title: "Quishing", desc: "Quishing involves QR codes that lead to malicious websites. These codes are often placed in emails, posters, or flyers and trick users into scanning them, thinking it's safe." },
              { title: "Link Manipulation", desc: "Attackers disguise dangerous links to make them appear harmless. For example, the link may say www.safe-site.com, but when you click, it redirects to a fake or malicious site." },
              { title: "Fake Websites", desc: "These are copycat versions of real websites (like banks or shopping sites) designed to steal your login info or payment details. They often look nearly identical to the original site." },
              { title: "Malvertising", desc: "Malvertising uses fake online ads to spread malware. Clicking these ads can install harmful software on your device or redirect you to phishing sites." },
            ].map((item, index) => (
              <div
                key={index}
                className={`card p-6 rounded-2xl shadow-lg transition-colors duration-300 ${
                  theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
