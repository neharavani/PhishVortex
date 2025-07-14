"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");

    if (!email || !password || !confirmPassword) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed.");
      } else {
        setMessage("Signup successful! Redirecting...");
        // Optional: redirect to login after short delay
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/login-bg1.jpg')",
      }}
    >
      <div
        className={`p-8 rounded-lg shadow-lg w-96 ${
          theme === "dark"
            ? "bg-black text-white shadow-cyan-500"
            : "bg-white text-gray-900 shadow-blue-500"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Error / Success Message */}
        {message && (
          <p className={`text-sm text-center mb-3 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-2 rounded-md ${loading ? "bg-gray-400" : "bg-cyan-500 hover:bg-cyan-600"} text-white`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
