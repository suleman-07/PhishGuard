import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser, signupUser } from "../services/api";

export default function AuthView({ onAuthSuccess }) {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        await response.json();
        onAuthSuccess();
      } catch {
        alert("Google authentication failed. Please try again.");
      }
    },
    onError: () => alert("Google sign-in was cancelled or failed."),
  });

  const handleFacebookMock = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const popup = window.open(
      "https://www.facebook.com/login.php",
      "Facebook Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        onAuthSuccess();
      }
    }, 600);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please complete all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (authType === "login") {
        const response = await loginUser(email, password);

        if (response?.token) {
          onAuthSuccess(response.token);
        } else {
          setError(response?.error || response?.message || "Authentication failed.");
        }
      } else {
        // signup flow: create account but DO NOT auto-authenticate
        const response = await signupUser(email, password);

        if (response && (response.user_id || response.message)) {
          setSuccess("Account created. Please sign in.");
          setError(null);
          setAuthType("login");
          setEmail("");
          setPassword("");
        } else {
          setError(response?.error || response?.message || "Registration failed.");
        }
      }
    } catch (err) {
      setError(err.message || "Unable to reach the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-10 text-slate-100">
    
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-400/5 via-transparent to-transparent">

      </div>

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(36,48,71,0.1)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-lg">🛡</div>
            <span className="text-base font-extrabold text-slate-100">
              PhishGuard<span className="text-cyan-400">AI</span>
            </span>
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-800 bg-slate-900/95 p-9 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <h2 className="mb-1 text-2xl font-extrabold text-slate-100">
            {authType === "login" ? "Sign in to your account" : "Create an account"}
          </h2>
          <p className="mb-7 text-sm text-slate-400">Protect yourself from phishing attacks</p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path fill="#EA4335" d="M12.2 10.2v3.6h6.8c-.3 1.6-1.8 4.7-6.8 4.7-4.3 0-7.8-3.6-7.8-8s3.5-8 7.8-8c2.5 0 4.1 1 5 1.9l2.8-2.8C18.2 2 15.5 1 12.2 1 6 1 1 6 1 12.2s5 11.2 11.2 11.2c5.8 0 11.2-4.1 11.2-11.2 0-.8-.1-1.4-.2-2H12.2z" />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={handleFacebookMock}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <div className="h-px flex-1 bg-slate-700" />
            <span>OR</span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="auth-email" className="mb-2 block text-xs font-semibold text-slate-400">
                Email address
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-[9px] border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="mb-2 block text-xs font-semibold text-slate-400">
                Password
              </label>
              <input
                id="auth-password"
                name="password"
                type="password"
                autoComplete={authType === "login" ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-[9px] border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
            {error && (
              <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-[10px] bg-cyan-500 px-4 py-3 text-sm font-extrabold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Please wait…" : authType === "login" ? "Sign in →" : "Create account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {authType === "login" ? (
              <>
                Don't have an account?{' '}
                <button type="button" className="font-semibold text-cyan-400" onClick={() => setAuthType("signup")}>Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" className="font-semibold text-cyan-400" onClick={() => setAuthType("login")}>Sign in</button>
              </>
            )}
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">Protected by industry-standard encryption. No data stored.</p>
      </div>
    </div>
  );
}
