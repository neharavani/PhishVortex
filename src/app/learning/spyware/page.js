'use client';

import ThemeCard from '../../components/ThemeCard';
import ThemePageWrapper from '../../components/ThemePageWrapper';

export default function SpywarePage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">

        {/* Educational Video Section */}
         <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/SpywareVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ThemeCard>

        {/* What is Spyware Section */}
         <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Spyware?</h2>
          <p>
            Spyware is malicious software designed to secretly monitor and collect information from your computer or device without your consent.
            It can record your keystrokes, capture screenshots, monitor browsing habits, and even steal sensitive data such as passwords or financial details.
            Spyware is often bundled with free software downloads or delivered through malicious email attachments and compromised websites.
          </p>
        </ThemeCard>

        {/* Types of Spyware Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of Spyware</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Keyloggers", desc: "Records keystrokes to capture sensitive data like passwords and credit card numbers." },
              { title: "Adware", desc: "Displays unwanted advertisements and tracks user activity for targeted ads." },
              { title: "Trojans", desc: "Disguised as legitimate software but secretly collects data or controls the system." },
              { title: "Tracking Cookies", desc: "Tracks user behavior online and collects browsing data for advertising." },
              { title: "System Monitors", desc: "Monitors system-level activities like application usage and network traffic." },
              { title: "Password Stealers", desc: "Designed to steal stored passwords from browsers and other software." },
            ].map((item, index) => (
              <div key={index} className="card p-6 rounded-2xl shadow-lg dark:bg-gray-800 bg-gray-100 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </ThemePageWrapper>
  );
}
