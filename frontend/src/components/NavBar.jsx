export default function NavBar({ onSignOut, onScan }) {
  return (
    <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-slate-800 bg-slate-950/95 px-[clamp(20px,5vw,80px)] backdrop-blur-xl">
      <div className="flex items-center gap-3 text-slate-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-lg">🛡</div>
        <div className="font-extrabold text-base">
          PhishGuard<span className="text-cyan-400">AI</span>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-cyan-300">
          v2.5
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-xl border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
        >
          Sign out
        </button>
        <button
          type="button"
          onClick={onScan}
          className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-extrabold text-slate-950 transition hover:opacity-90"
        >
          Run a scan →
        </button>
      </div>
    </nav>
  );
}
