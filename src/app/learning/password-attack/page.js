'use client';

import ThemeCard from '../../components/ThemeCard';
import ThemePageWrapper from '../../components/ThemePageWrapper';

export default function PasswordAttackPage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">

        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/video-pass.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ThemeCard>
        {/* What is a Password Attack Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is a Password Attack?</h2>
          <p>
            A password attack encompasses various methods cybercriminals use to gain unauthorized access to accounts by compromising passwords. These attacks exploit weaknesses in both human behavior and technological systems. In today's digital landscape, passwords are the primary gatekeepers to our most sensitive information, from financial accounts to personal communications.
          </p>
          <p className="mt-3">
            Attackers employ sophisticated tools and techniques including automated systems that can attempt millions of combinations per second, social engineering tactics that manipulate users into revealing their credentials, and malware designed specifically to harvest password data. The sophistication and persistence of these attacks continue to evolve as security measures improve.
          </p>
          <p className="mt-3">
            What makes password attacks particularly concerning is their potential for cascading damage. Once an attacker obtains credentials for one account, they frequently gain access to multiple services due to password reuse. Understanding these attack vectors is the first step toward implementing effective countermeasures and maintaining your digital security posture.
          </p>
        </ThemeCard>

        {/* Types of Password Attacks Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of Password Attacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Brute Force Attack", 
                desc: "Automated trial of all possible password combinations until the correct one is found. Attackers use specialized software that systematically checks combinations of characters, numbers, and symbols. Strong passwords with high complexity can make these attacks impractically time-consuming. Modern systems implement measures like account lockouts and CAPTCHAs as protection."
              },
              { 
                title: "Dictionary Attack", 
                desc: "Uses a prearranged list of likely passwords to breach accounts. Unlike brute force, dictionary attacks work with curated lists of common words, phrases, and known passwords. These often include variations with numbers and special characters. Attackers enhance their dictionaries with information gathered from social media, incorporating personal details like pet names and birthdays."
              },
              { 
                title: "Credential Stuffing", 
                desc: "Uses stolen credentials from previous breaches to access other accounts. This attack exploits password reuse across multiple websites. When one service is compromised, attackers automatically try these username-password combinations on many other websites. Studies show that over 65% of people reuse passwords across multiple accounts, making a single breach potentially catastrophic."
              },
              { 
                title: "Phishing for Passwords", 
                desc: "Tricks users into revealing passwords via fake emails or websites. Sophisticated phishing creates replicas of legitimate login pages for banks, email providers, or social platforms. These attacks often include urgent messages about account problems or security alerts to create urgency. Modern phishing may be highly targeted using personal information to appear more convincing."
              },
              { 
                title: "Keylogging", 
                desc: "Records keystrokes to capture passwords as users type them. Keyloggers can be installed through malware, compromised hardware, or physical access to a device. Beyond recording keyboard inputs, advanced keyloggers might also capture screenshots and monitor form fills. Keyloggers are particularly dangerous because they bypass strong password policies by capturing credentials directly."
              },
              { 
                title: "Password Spraying", 
                desc: "Uses common passwords against many accounts to avoid lockouts. Unlike brute force attacks targeting a single account, password spraying tries a few extremely common passwords against numerous accounts. This technique evades security measures that lock accounts after multiple failed attempts. It's especially effective in corporate environments where users might follow similar password creation patterns."
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