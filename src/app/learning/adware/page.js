'use client';
import ThemeCard from '../../components/ThemeCard';
import ThemePageWrapper from '../../components/ThemePageWrapper';

export default function AdwarePage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">
        
        {/* Educational Video Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/AdwareVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ThemeCard>
        
        {/* What is Adware Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Adware?</h2>
          <p className="mb-3">
            Adware is a type of software that automatically delivers unwanted advertisements to users.
            While some adware is legitimate, malicious adware can track your browsing habits, collect data, and bombard your system with intrusive ads.
          </p>
          <p className="mb-3">
            These programs often come bundled with free software and may install browser extensions or plugins without clear user consent.
            The boundary between legitimate advertising and malicious adware can sometimes be blurry, with some programs starting as the former before evolving into the latter.
          </p>
          <p>
            In some cases, adware can also act as spyware, collecting personal information without user consent.
            Recognizing and removing adware helps improve device performance, protect privacy, and enhance your overall digital security posture.
          </p>
        </ThemeCard>
        
        {/* Types of Adware Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of Adware</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Pop-Up Adware", 
                desc: "Generates pop-up ads that interrupt user activity and may lead to malicious sites. These can appear even when you're not browsing the web and often require direct interaction to close." 
              },
              { 
                title: "In-Text Adware", 
                desc: "Injects advertisements directly into web page text, usually by double-underlining certain words that convert to ads when hovered over. This type modifies legitimate website content without permission." 
              },
              { 
                title: "Video Adware", 
                desc: "Displays video ads that play automatically, often consuming bandwidth and slowing down your device. These can be particularly intrusive on mobile devices with limited data plans." 
              },
              { 
                title: "Spyware-Enabled Adware", 
                desc: "Tracks user behavior and collects data for targeted advertising. This variety can monitor your browsing history, search queries, and even keystrokes to build a profile for ad targeting." 
              },
              { 
                title: "Bundled Adware", 
                desc: "Comes packaged with free software downloads without clear user consent. Installation wizards often use pre-checked boxes or confusing language to trick users into installing additional unwanted programs." 
              },
              { 
                title: "Mobile Adware", 
                desc: "Targets mobile devices with intrusive ads and potential data collection. These can drain battery life, consume data, and in some cases, even generate phantom clicks on advertisements in the background." 
              },
              { 
                title: "Browser Hijackers", 
                desc: "Changes your browser settings including homepage, default search engine, and new tab pages to display ads or redirect to partner sites. Often difficult to reverse without special tools." 
              },
              { 
                title: "Toolbar Adware", 
                desc: "Installs browser toolbars that display ads and collect browsing data. These toolbars often provide minimal functionality while consuming screen space and system resources." 
              },
              { 
                title: "Persistent Adware", 
                desc: "Uses sophisticated techniques to resist removal and reinstall itself after deletion. May create multiple registry entries or duplicate files across the system to maintain presence." 
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