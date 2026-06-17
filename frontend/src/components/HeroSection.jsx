export default function HeroSection({ onScan }) {
  return (
    <section className="relative overflow-hidden px-[clamp(20px,5vw,80px)] py-[clamp(72px,11vw,130px)]">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(36,48,71,0.1)_1px,transparent_1px)] bg-[length:60px_60px] mask-[radial-gradient(ellipse_80%_70%_at_50%_50%,black_40%,transparent_100%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/6 px-4 py-2 text-sm text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          ACTIVE PROTECTION · ML POWERED
        </div>

        <h1 className="max-w-[780px] text-[clamp(40px,7vw,74px)] font-black leading-[1.04] tracking-[-0.04em] text-slate-100">
          Detect phishing{' '}
          <span className="relative inline-block text-cyan-400">
            before it gets you
            <svg className="absolute left-0 bottom-[-4px] h-[10px] w-full" viewBox="0 0 300 3" preserveAspectRatio="none">
              <line x1="0" y1="1.5" x2="300" y2="1.5" stroke="#00D4FF" strokeWidth="2" strokeDasharray="6 3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="mt-6 max-w-[500px] text-[clamp(16px,2vw,19px)] leading-7 text-slate-400">
          Our ML scanner analyzes 4 real-world signals and returns a risk verdict in under one second — no technical knowledge required.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onScan}
            className="rounded-[10px] bg-cyan-500 px-8 py-4 text-base font-extrabold text-slate-950 transition hover:opacity-90"
          >
            Check a website now →
          </button>
          <a href="#how" className="rounded-[10px] border border-slate-700 bg-transparent px-8 py-4 text-base font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
