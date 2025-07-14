export default function Footer() {
    return (
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            {/* Logo & Copyright */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">PhishVortex</h2>
              <p className="text-sm mt-1">&copy; {new Date().getFullYear()} PhishVortex. All rights reserved.</p>
            </div>
  
            {/* Navigation Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/Dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
              <a href="/aboutme" className="hover:text-blue-600 dark:hover:text-blue-400">About me</a>

            </div>
  
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">🔵 Facebook</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">🟣 Instagram</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">🔷 LinkedIn</a>
            </div>
          </div>
  
          {/* Bottom Border */}
          <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-4 text-center text-sm">
            Made with ❤️ for a safer digital world.
          </div>
        </div>
      </footer>
    );
  }
  