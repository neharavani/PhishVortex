'use client';

import React from 'react';
import ThemePageWrapper from '../components/ThemePageWrapper';
import ThemeCard from '../components/ThemeCard';

export default function AboutUsPage() {
  return (
    <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-grow">
        <ThemeCard className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">About Me</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-cyan-300 mb-3">My Mission</h2>
              <p className="mb-4">
                I'm passionate about making cybersecurity education accessible, engaging, and effective.
                Through this interactive learning platform, I aim to empower individuals with the knowledge 
                and skills needed to protect themselves in our increasingly digital world.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-cyan-300 mb-3">What This Platform Offers</h2>
              <p className="mb-3">
                This platform provides a unique approach to cybersecurity education through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Interactive cybersecurity games and challenges</li>
                <li>Practical, real-world scenarios to apply security concepts</li>
                <li>Personalized learning experiences</li>
                <li>Up-to-date content reflecting the latest security threats</li>
                <li>Approachable learning for all skill levels</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-cyan-300 mb-3">About the Developer</h2>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Individual Project</h3>
                  <p className="mb-4">
                    This platform is a solo project that I've developed with guidance from my mentor. 
                    It represents my commitment to cybersecurity education and my interest in creating 
                    engaging, interactive learning experiences.
                  </p>
                  <p>
                    With a background in web development and a passion for cybersecurity, I've created 
                    this platform to make security concepts more accessible and to help people build 
                    practical skills through gamification.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Acknowledgments</h3>
                <p>
                  Special thanks to my mentor Dr Manu Shrivastava for providing guidance, feedback, and encouragement 
                  throughout the development of this project. Their expertise and support have been 
                  invaluable in bringing this platform to life.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-cyan-300 mb-3">Get in Touch</h2>
              <p className="mb-4">
                Have questions, feedback, or suggestions? I'd love to hear from you!
              </p>
              <div>
                <p className="mb-2"><strong>Email:</strong> neharavani1204@gmail.com</p>
                <p><strong>GitHub:</strong> github.com/neharavani</p>
              </div>
            </section>
          </div>
        </ThemeCard>
      </main>
    </ThemePageWrapper>
  );
}