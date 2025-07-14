"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    // Simulate API request
    setTimeout(() => {
      setMessage("If this email exists, a reset link has been sent.");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-md"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}
        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-cyan-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
