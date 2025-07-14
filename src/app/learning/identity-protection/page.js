'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function IdentityProtectionPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-cyan-400">
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">

        {/* Educational Video Section */}
        <div className="card p-6 w-full md:w-3/4 rounded-2xl dark:bg-gray-800 bg-gray-100 shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/IdentityProtectionVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* What is Identity Protection Section */}
        <div className="card p-6 w-full md:w-3/4 rounded-2xl dark:bg-gray-800 bg-gray-100 shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Identity Protection?</h2>
          <p className="mb-3">
            Identity protection involves safeguarding your personal information from unauthorized access and misuse.
            In today's digital world, your identity is comprised of various data points including your name, Social Security number, date of birth, financial account details, and even biometric information.
            As our lives become increasingly digital, the risk of identity theft and fraud continues to grow.
          </p>
          <p className="mb-3">
            Cybercriminals use tactics such as phishing, data breaches, social engineering, and malware to steal identities and commit fraud.
            Once they gain access to your personal information, criminals can open new accounts, take out loans, file fraudulent tax returns, or even commit crimes using your identity.
            The consequences can be devastating, often taking years and significant effort to resolve.
          </p>
          <p>
            Protecting your identity includes using strong passwords, enabling two-factor authentication, monitoring personal accounts, and being cautious of suspicious activities online.
            Identity protection isn't just a one-time action but rather an ongoing process and mindset of security awareness.
            Stay informed and vigilant to reduce the risk of identity theft and ensure that your personal information remains secure.
          </p>
        </div>

        {/* Ways to Protect Your Identity Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Ways to Protect Your Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Use Strong Passwords", 
                desc: "Create complex passwords using a mix of letters, numbers, and symbols. Avoid using the same password across multiple accounts and consider using a reputable password manager to keep track of them securely." 
              },
              { 
                title: "Enable Two-Factor Authentication", 
                desc: "Add an extra layer of security by requiring two forms of verification when accessing your accounts. This typically combines something you know (password) with something you have (mobile device) to verify your identity." 
              },
              { 
                title: "Monitor Your Accounts", 
                desc: "Regularly check bank and credit card statements for unauthorized transactions. Set up account alerts for suspicious activity and consider using identity monitoring services that track your personal information across the web." 
              },
              { 
                title: "Beware of Phishing", 
                desc: "Avoid clicking on suspicious links or downloading attachments from unknown sources. Verify the legitimacy of emails requesting personal information, even if they appear to come from trusted organizations. Legitimate companies rarely request sensitive information via email." 
              },
              { 
                title: "Limit Personal Sharing", 
                desc: "Be cautious about sharing personal information on social media platforms. Adjust privacy settings to limit who can see your information, and be selective about what details you share publicly. Even seemingly innocent information can be used for identity theft." 
              },
              { 
                title: "Secure Your Devices", 
                desc: "Keep your devices protected with security software and regular updates. Enable automatic updates for your operating system and applications to patch security vulnerabilities that could be exploited by identity thieves." 
              },
              { 
                title: "Freeze Your Credit", 
                desc: "Consider placing a security freeze on your credit reports with the major credit bureaus. This prevents new accounts from being opened in your name without your explicit permission, effectively blocking unauthorized access to your credit file." 
              },
              { 
                title: "Use Secure Connections", 
                desc: "When online, especially when accessing sensitive information or making purchases, ensure you're using secure connections (look for HTTPS in the URL and a padlock icon). Avoid using public Wi-Fi for sensitive transactions or use a VPN service." 
              },
              { 
                title: "Shred Sensitive Documents", 
                desc: "Physical documents containing personal information should be securely shredded before disposal. This includes bank statements, medical records, expired credit cards, and documents containing Social Security numbers or account information." 
              },
              { 
                title: "Check Your Credit Reports", 
                desc: "Review your credit reports from all three major bureaus (Equifax, Experian, and TransUnion) at least annually. Look for accounts you don't recognize, inquiries you didn't authorize, or other suspicious activity that could indicate identity theft." 
              },
              { 
                title: "Be Cautious with Personal Information", 
                desc: "Only provide your Social Security number or other sensitive information when absolutely necessary. Ask questions about how your information will be protected and why it's needed before sharing it with businesses or organizations." 
              },
              { 
                title: "Report Suspicious Activity", 
                desc: "If you notice any signs of identity theft, report it immediately to the relevant institutions, including your financial providers, credit bureaus, and local law enforcement. Quick action can help limit the damage and facilitate faster recovery." 
              }
            ].map((item, index) => (
              <div key={index} className="card p-6 rounded-2xl shadow-lg dark:bg-gray-800 bg-gray-100 transition-colors duration-300">
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