import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to PhishVortex</h1>
      <div className="mt-4 space-x-4">
        <Link href="/auth/login" className="px-4 py-2 bg-cyan-500 text-white rounded-md">
          Login
        </Link>
        <Link href="/auth/signup" className="px-4 py-2 border border-cyan-500 text-cyan-500 rounded-md">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
