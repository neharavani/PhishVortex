"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Clear user session, JWT token, etc.
    localStorage.removeItem("token");  // Assuming token is stored in localStorage
    router.push("/auth/login"); // Redirect to login page
  }, [router]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`p-6 flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className={`w-full max-w-4xl p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Logging Out...</h2>
          <p className="text-center text-lg">You are being logged out. Redirecting to login page...</p>
        </div>
      </div>
    </div>
  );
}
