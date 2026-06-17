import { useEffect, useState } from "react";

export default function ResultPanel({ result }) {
  const [bar, setBar] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setBar(result.risk_score), 80);
    return () => clearTimeout(timeout);
  }, [result]);

  const score = result.risk_score;
  const color = score > 60 ? "#F04060" : score > 35 ? "#F59E0B" : "#10D98A";
  const label = score > 60 ? "HIGH RISK" : score > 35 ? "SUSPICIOUS" : "LOW RISK";
  const advice = score > 60
    ? "Close this tab immediately. Do not enter any credentials, personal data, or payment details on this site."
    : score > 35
    ? "Proceed with caution. Verify the site through official channels before entering sensitive information."
    : "This site shows low phishing indicators. Standard safe browsing practices still apply.";

  return (
    <div className="mt-6 animate-revealUp">
      <div className="overflow-hidden rounded-[14px] border" style={{ borderColor: `${color}40`, backgroundColor: "#111827" }}>
        <div
          className="flex flex-wrap items-start justify-between gap-4 px-6 py-5"
          style={{ backgroundColor: `${color}0D`, borderBottom: `1px solid ${color}25` }}
        >
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-400 font-mono">ANALYSIS COMPLETE</p>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}88` }} />
              <h3 className="text-2xl font-extrabold tracking-[-0.03em]" style={{ color }}>{label}</h3>
            </div>
          </div>

          <div className="text-right">
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-400 font-mono">RISK SCORE</p>
            <div className="text-[38px] font-black leading-none" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
              {score}
              <span className="text-[18px] font-normal text-slate-400">%</span>
            </div>
          </div>
        </div>

        <div className="px-6 pt-5 pb-4">
          <div className="mb-2 h-1 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-[1200ms]"
              style={{ width: `${bar}%`, backgroundColor: color }}
            />
          </div>
          <div className="flex justify-between text-[9px] uppercase tracking-[0.1em] text-slate-500 font-mono">
            <span>SAFE</span>
            <span>SUSPICIOUS</span>
            <span>PHISHING</span>
          </div>
        </div>

        <div className="px-6 pb-5 pt-4">
          <p className="text-sm leading-7 text-slate-300">
            <span className="font-semibold" style={{ color }}>{`Recommendation: `}</span>
            {advice}
          </p>
        </div>
      </div>
    </div>
  );
}
