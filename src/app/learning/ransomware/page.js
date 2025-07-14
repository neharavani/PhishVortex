'use client';
import ThemeCard from '../../components/ThemeCard';
import ThemePageWrapper from '../../components/ThemePageWrapper';

export default function RansomwarePage() {
  return (
    <ThemePageWrapper>
      <main className="flex-grow p-6 flex flex-col space-y-6 items-center">

        {/* Educational Video Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Educational Video</h2>
          <div className="w-full">
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/videos/RansomwareVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ThemeCard>

        {/* What is Ransomware Section */}
        <ThemeCard className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">What is Ransomware?</h2>
          <p>
            Ransomware is a type of malicious software that encrypts a victim’s data, holding it hostage until a ransom is paid.
            Cybercriminals demand payment, often in cryptocurrency, in exchange for the decryption key.
            Ransomware attacks can affect individuals and businesses alike, leading to data loss and operational disruption.
            Preventing ransomware involves maintaining strong cybersecurity practices and regular data backups.
          </p>
        </ThemeCard>

        {/* Types of Ransomware Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Types of Ransomware</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Crypto Ransomware", desc: "Encrypts files and demands payment for decryption." },
              { title: "Locker Ransomware", desc: "Locks users out of their devices, preventing access to any functions." },
              { title: "Scareware", desc: "Uses fake threats and alerts to scare victims into paying." },
              { title: "Doxware", desc: "Threatens to release sensitive data publicly unless the ransom is paid." },
              { title: "Mobile Ransomware", desc: "Targets mobile devices, locking access or encrypting data." },
              { title: "Ransomware-as-a-Service (RaaS)", desc: "Ransomware sold as a service to less-skilled cybercriminals." },
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
