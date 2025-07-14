'use client';

import ThemeCard from '../../components/ThemeCard';
import ThemePageWrapper from '../../components/ThemePageWrapper';

export default function CryptojackingPage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/CryptojackingVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ThemeCard>

        {/* What is Cryptojacking Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Cryptojacking?</h2>
          <p className="mb-3">
            Cryptojacking is a form of cyberattack where hackers secretly use your device's computing power to mine cryptocurrencies.
            It typically happens without your consent, slowing down your system and significantly increasing energy consumption.
            Unlike ransomware, cryptojacking is designed to remain undetected for as long as possible to maximize illicit profits.
          </p>
          <p className="mb-3">
            The attackers profit by solving complex mathematical problems using your computing resources, which validates cryptocurrency transactions and generates new coins.
            This process is resource-intensive, which is why hackers prefer to use someone else's hardware and electricity rather than their own.
            The most commonly mined cryptocurrencies through cryptojacking are Monero and other privacy-focused coins that are difficult to trace.
          </p>
          <p>
            Cryptojacking can occur through malicious emails, infected websites with JavaScript miners, or compromised software and extensions.
            Detecting cryptojacking is challenging because the symptoms can be subtle and easily mistaken for normal system performance issues, making awareness essential to protect your devices and resources.
          </p>
        </ThemeCard>

        {/* Signs and Prevention of Cryptojacking */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Signs and Prevention of Cryptojacking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "System Slowdown", 
                desc: "Unusual lagging or reduced performance in your device, especially when the system should otherwise be idle. Applications may take longer to load or respond to inputs." 
              },
              { 
                title: "Overheating", 
                desc: "Devices overheating due to excessive CPU or GPU usage, even when not running demanding software. Fans may run at high speeds constantly to cool the system." 
              },
              { 
                title: "High Energy Bills", 
                desc: "Unexpected spike in electricity consumption without a clear reason. Mining cryptocurrencies requires significant energy, which can result in noticeably higher utility costs." 
              },
              { 
                title: "Unusual Network Traffic", 
                desc: "Abnormal increase in data usage or network activity, especially to unfamiliar addresses. Cryptominers need to communicate with mining pools and update blockchain information." 
              },
              { 
                title: "Battery Drain", 
                desc: "Mobile devices or laptops experience much faster battery depletion than normal. A device that previously lasted all day might now require charging by midday." 
              },
              { 
                title: "CPU Usage Spikes", 
                desc: "Task Manager or Activity Monitor shows high processor usage even when you're not running intensive applications. Look for unfamiliar processes consuming resources." 
              },
              { 
                title: "Use Security Software", 
                desc: "Install and regularly update reputable security tools that detect and block cryptojacking scripts. Many modern antivirus solutions include specific protections against crypto miners." 
              },
              { 
                title: "Browser Extensions", 
                desc: "Install browser extensions specifically designed to block mining scripts like NoCoin or minerBlock. These can prevent browser-based cryptojacking while browsing the web." 
              },
              { 
                title: "Avoid Suspicious Links", 
                desc: "Be cautious when clicking unknown links or downloading files. Phishing emails often deliver cryptojacking malware through seemingly harmless attachments or links." 
              },
              { 
                title: "Keep Software Updated", 
                desc: "Regularly update your operating system, browsers, and applications to patch security vulnerabilities that cryptojackers might exploit to gain access to your system." 
              },
              { 
                title: "Use Ad Blockers", 
                desc: "Quality ad blockers can help prevent cryptojacking by blocking connections to known mining pools and scripts that are delivered through advertising networks." 
              },
              { 
                title: "Network Monitoring", 
                desc: "For businesses, implement network monitoring tools that can detect unusual traffic patterns or connections to cryptocurrency mining pools, alerting IT staff to potential threats." 
              }
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