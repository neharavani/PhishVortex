"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/Dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg1.jpg')" }}
    >
      <div
        className={`p-8 rounded-lg shadow-lg w-96 ${
          theme === "dark"
            ? "bg-black text-white shadow-cyan-500"
            : "bg-white text-gray-900 shadow-blue-500"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="text-right text-sm mb-4">
          <Link href="/auth/forgot-password" className="text-cyan-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-cyan-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
