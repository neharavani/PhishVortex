'use client';

import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';
export default function SocialEngineeringPage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">

        {/* Educational Video Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/SocialEngineeringVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ThemeCard>

        {/* What is Social Engineering Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Social Engineering?</h2>
          <p>
            Social engineering is a psychological manipulation technique used by cybercriminals to trick individuals into revealing confidential information or performing actions that compromise security.
            Unlike technical hacking, social engineering relies on human interaction and often exploits trust, fear, or curiosity to achieve malicious goals.
            Understanding these tactics is critical in defending against such attacks.
          </p>
        </ThemeCard>

        {/* Types of Social Engineering Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of Social Engineering Attacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Pretexting", desc: "An attacker creates a fabricated scenario to steal personal information." },
              { title: "Baiting", desc: "Entices victims with something tempting (like free software) to trick them into revealing sensitive data." },
              { title: "Tailgating", desc: "An unauthorized person physically follows authorized personnel into restricted areas." },
              { title: "Quid Pro Quo", desc: "Promises a benefit or service in exchange for sensitive information." },
              { title: "Phishing", desc: "Fraudulent messages or emails to steal sensitive information or install malware." },
              { title: "Vishing (Voice Phishing)", desc: "Uses phone calls to deceive victims into revealing private data." },
            ].map((item, index) => (
              <ThemeCard key={index}>
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{item.title}</h3>
                <p>{item.desc}</p>
              </ThemeCard>
            ))}
          </div>
        </div>

      </main>
    </ThemePageWrapper>
  );
}
