"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ThemePageWrapper from "../components/ThemePageWrapper";
import ThemeCard from "../components/ThemeCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Expanded mock data based on the provided file structure
  const mockData = [
    // Learning content
    { id: 1, title: "Phishing Awareness: Protect Your Information", category: "Learning", url: "/learning/phishing-awareness" },
    { id: 2, title: "Malware Prevention: Safeguard Your Devices", category: "Learning", url: "/learning/malware-prevention" },
    { id: 3, title: "Password Attack: Understanding the Risks", category: "Learning", url: "/learning/password-attack" },
    { id: 4, title: "Social Engineering: Recognizing Human Hacking", category: "Learning", url: "/learning/social-engineering" },
    { id: 5, title: "Ransomware: What You Need to Know", category: "Learning", url: "/learning/ransomware" },
    { id: 6, title: "Spyware: Hidden Threats on Your Devices", category: "Learning", url: "/learning/spyware" },
    { id: 7, title: "Man-in-the-Middle Attacks Explained", category: "Learning", url: "/learning/man-in-the-middle" },
    { id: 8, title: "Identity Protection: Securing Your Digital Self", category: "Learning", url: "/learning/identity-protection" },
    { id: 9, title: "Cryptojacking: When Hackers Mine Using Your Resources", category: "Learning", url: "/learning/cryptojacking" },
    { id: 10, title: "Adware: Unwanted Ads and Privacy Concerns", category: "Learning", url: "/learning/adware" },
    
    // Quiz content
    { id: 11, title: "Phishing Quiz: Test Your Knowledge", category: "Quiz", url: "/quiz/phishing" },
    { id: 12, title: "Malware Quiz: Challenge Your Understanding", category: "Quiz", url: "/quiz/malware" },
    { id: 13, title: "Password Security Quiz", category: "Quiz", url: "/quiz/password" },
    { id: 14, title: "Social Engineering Quiz", category: "Quiz", url: "/quiz/social" },
    { id: 15, title: "Ransomware Quiz", category: "Quiz", url: "/quiz/ransomeware" },
    { id: 16, title: "Spyware Quiz", category: "Quiz", url: "/quiz/spyware" },
    { id: 17, title: "Man-in-the-Middle Attack Quiz", category: "Quiz", url: "/quiz/man-in-the-middle" },
    { id: 18, title: "Identity Protection Quiz", category: "Quiz", url: "/quiz/identity" },
    { id: 19, title: "Cryptojacking Quiz", category: "Quiz", url: "/quiz/cryptojacking" },
    { id: 20, title: "Adware Quiz", category: "Quiz", url: "/quiz/adware" },
    { id: 21, title: "Final Cybersecurity Assessment", category: "Quiz", url: "/quiz/final" },
    
    // Games
    { id: 22, title: "Phish or Not: Spot the Scam", category: "Game", url: "/Game/PhishorNot" },
    { id: 23, title: "Password Strength Challenge", category: "Game", url: "/Game/PasswordStrength" },
    { id: 24, title: "Phishing Hunt: Find the Red Flags", category: "Game", url: "/Game/PhishingHunt" },
    { id: 25, title: "Speedify: Quick Security Decisions", category: "Game", url: "/Game/Speedify" },
    
    // Authentication pages
    { id: 26, title: "Login to Your Account", category: "Auth", url: "/auth/login" },
    { id: 27, title: "Create New Account", category: "Auth", url: "/auth/signup" },
    { id: 28, title: "Reset Your Password", category: "Auth", url: "/auth/forgot-password" },
    
    // Dashboard
    { id: 29, title: "Your Security Dashboard", category: "Dashboard", url: "/Dashboard" },
    
    // About
    { id: 30, title: "About PhishVortex", category: "About", url: "/aboutme" }
  ];

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, [query]);

  const performSearch = (searchTerm) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter mock data based on search term
      const filteredResults = mockData.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setNoResults(filteredResults.length === 0);
      setIsLoading(false);
    }, 500);
    
    // In a real application, replace with actual API call
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with new search query
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchQuery);
    window.history.pushState({}, "", url);
    performSearch(searchQuery);
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-col flex-grow">
        <ThemeCard className="max-w-2xl w-full mb-6">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Search PhishVortex</h2>
          
          {/* Search form - centered like the quiz */}
          <form onSubmit={handleSearch} className="w-full mb-6">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search for articles, tutorials, tools..."
                className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-l focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="p-3 rounded-r bg-cyan-500 hover:bg-cyan-600 text-white transition-colors duration-300 flex items-center"
              >
                <Search size={20} className="mr-2" />
                Search
              </button>
            </div>
          </form>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          )}
          
          {/* Search results count */}
          {!isLoading && query && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                {searchResults.length > 0 
                  ? `Found ${searchResults.length} results for "${query}"` 
                  : `No results found for "${query}"`}
              </h3>
            </div>
          )}
        </ThemeCard>
        
        {/* Results list */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            {searchResults.map((result) => (
              <ThemeCard key={result.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.location.href = result.url}>
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded mb-2">
                  {result.category}
                </span>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <div className="flex items-center text-cyan-500 mt-2">
                  <span>View details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </ThemeCard>
            ))}
          </div>
        )}
        
        {/* No results state */}
        {noResults && !isLoading && (
          <ThemeCard className="text-center py-8 w-full max-w-2xl">
            <div className="text-cyan-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl font-medium mb-2">No results found</p>
            <p>Try different keywords or check your spelling</p>
          </ThemeCard>
        )}
        
        {/* Empty state - initial load with no query */}
        {!query && !isLoading && searchResults.length === 0 && (
          <ThemeCard className="text-center py-8 w-full max-w-2xl">
            <div className="text-cyan-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xl font-medium mb-2">Search PhishVortex</p>
            <p>Enter keywords to find articles, tutorials, quizzes and more</p>
          </ThemeCard>
        )}
      </main>
    </ThemePageWrapper>
  );
}