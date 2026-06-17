export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1100px] flex-col gap-3 border-t border-slate-800 px-[clamp(20px,5vw,80px)] py-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-slate-100">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 text-sm">🛡</div>
        <span className="font-semibold text-slate-200">
          PhishGuard<span className="text-cyan-400">AI</span>
        </span>
      </div>
      <p className="text-sm text-slate-500 sm:text-right">
        Predictions are probabilistic — always verify through official channels. · Built with ML + React
      </p>
    </footer>
  );
}
