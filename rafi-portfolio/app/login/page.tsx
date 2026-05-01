"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#111111",
    border: "0.5px solid #2a2a2a",
    color: "#f0ede8",
    fontFamily: "inherit",
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0a0a0a" }}>
      <div className="w-full max-w-sm rounded-md p-8"
        style={{ background: "#111111", border: "0.5px solid #2a2a2a" }}>
        <div className="text-center mb-8">
          <div className="text-2xl mb-1"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#e8d5b0", letterSpacing: "0.1em" }}>
            RAFI AHMED
          </div>
          <div className="text-xs uppercase tracking-widest"
            style={{ color: "#605850", letterSpacing: "0.18em" }}>
            Admin Portal
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider"
              style={{ color: "#605850", letterSpacing: "0.1em" }}>
              Username
            </label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#605850" }} />
              <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" required
                className="w-full rounded-sm text-sm pl-9 pr-4 py-2.5 outline-none"
                style={inputStyle} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider"
              style={{ color: "#605850", letterSpacing: "0.1em" }}>
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#605850" }} />
              <input type={showPass ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" required
                className="w-full rounded-sm text-sm pl-9 pr-10 py-2.5 outline-none"
                style={inputStyle} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#605850", background: "none", border: "none", cursor: "pointer" }}>
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs px-3 py-2 rounded-sm"
              style={{ background: "rgba(160,80,80,0.12)", color: "#c47878", border: "0.5px solid rgba(160,80,80,0.3)" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-sm text-sm font-medium mt-2 transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ background: "#e8d5b0", color: "#0a0a0a", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-xs transition-colors hover:underline"
            style={{ color: "#605850" }}>
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
