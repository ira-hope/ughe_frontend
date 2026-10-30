"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSiteInfo, getToken, login, saveToken } from "@/lib/api";

// Login page: the user signs in with the predefined credentials created in Django
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [site, setSite] = useState({});

  useEffect(() => {
    // Already logged in? Go straight to the home page
    if (getToken()) router.replace("/");
    // Load the logo from Django so it is not hardcoded
    fetchSiteInfo().then(setSite).catch(() => {});
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(username, password);
      // Keep the token so the home page can request content
      saveToken(data.token);
      router.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        {site.logo && <img src={site.logo} alt={site.site_name} className="login-logo" />}
        <h1>{site.site_name || "Sign in"}</h1>
        <p className="login-help">Sign in to continue</p>

        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Error message from Django (e.g. wrong password) */}
        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn btn-red" disabled={loading}>
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
