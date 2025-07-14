'use client';

import ThemeCard from '../../components/ThemeCard';
import ThemePageWrapper from '../../components/ThemePageWrapper';

export default function ManInTheMiddlePage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">

        {/* Educational Video Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <video className="w-full h-auto rounded-lg" controls>
            <source src="/videos/video-mitm.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </ThemeCard>

        {/* What is a MITM Attack Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is a Man-in-the-Middle (MITM) Attack?</h2>
          <p>
            A Man-in-the-Middle (MITM) attack occurs when a cybercriminal intercepts communication between two parties to steal or manipulate data.
            Attackers position themselves between the victim and the service they're trying to reach, enabling them to capture sensitive information like login credentials, personal data, or financial details.
            MITM attacks often occur over unsecured or public Wi-Fi networks.
          </p>
        </ThemeCard>

        {/* Types of MITM Attacks Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of MITM Attacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Wi-Fi Eavesdropping", desc: "Attackers use unsecured public Wi-Fi networks to intercept data." },
              { title: "HTTPS Spoofing", desc: "Fake SSL certificates trick users into believing they are on a secure site." },
              { title: "Email Hijacking", desc: "Attackers gain access to email communications to monitor or manipulate transactions." },
              { title: "Session Hijacking", desc: "Cybercriminals steal session cookies to impersonate users online." },
              { title: "DNS Spoofing", desc: "Redirects victims to malicious sites by corrupting DNS data." },
              { title: "IP Spoofing", desc: "Attackers disguise themselves as trusted IP addresses to gain access to systems." },
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
