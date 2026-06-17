import OptionCard from "./OptionCard";
import ResultPanel from "./ResultPanel";
import Scanning from "./Scanning";
import { modeTabs, questions } from "../utils/constants";

export default function ScannerSection({
  scanRef,
  scanMode,
  onModeChange,
  urlText,
  onUrlChange,
  formData,
  onQuestionChange,
  onAnalyzeRisk,
  loading,
  error,
  result,
}) {
  return (
    <section ref={scanRef} id="scan" className="px-[clamp(20px,5vw,80px)] pb-[clamp(80px,10vw,120px)] pt-0">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-9">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-1.5 w-14 rounded-full bg-cyan-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-mono">
              SCANNER TOOL
            </span>
          </div>
          <h2 className="text-[clamp(26px,4vw,38px)] font-extrabold text-slate-100">
            Check any site in 30 seconds
          </h2>
          <p className="mt-2 max-w-[460px] text-sm leading-7 text-slate-400">
            Paste a URL for instant analysis, or answer 4 quick questions about what you observe on the page.
          </p>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-5 py-4">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 opacity-80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500 opacity-80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 opacity-80" />
            </div>
            <span className="ml-2 text-[11px] uppercase tracking-[0.08em] text-slate-400 font-mono">
              phishguard-scanner — bash
            </span>
            <div className="ml-auto rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] uppercase tracking-[0.1em] text-emerald-300 font-mono">
              ● ONLINE
            </div>
          </div>

          <div className="flex bg-slate-950 border-b border-slate-800 p-1">
            {modeTabs.map((tab) => (
              <button
                key={tab.mode}
                type="button"
                onClick={() => onModeChange(tab.mode)}
                className={`flex-1 rounded-xl px-3 py-3 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                  scanMode === tab.mode
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="p-[clamp(24px,4vw,40px)]">
            {scanMode === "url" ? (
              <div className="animate-revealUp space-y-3">
                <label className="block text-sm font-semibold text-slate-200">Paste the suspicious URL below</label>
                <div className="flex items-center gap-3 rounded-[12px] border border-slate-800 bg-slate-950 px-4 py-3 transition focus-within:border-cyan-400">
                  <span className="text-xl">🌐</span>
                  <input
                    value={urlText}
                    onChange={(event) => onUrlChange(event.target.value)}
                    placeholder="https://secure-login-update-paypal.net/verify"
                    className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>
                <p className="text-xs text-slate-500">Try: suspicious links from emails, SMS messages, or social media posts.</p>
              </div>
            ) : (
              <div className="animate-revealUp space-y-10">
                {questions.map((question, index) => (
                  <div key={question.id} className={index < questions.length - 1 ? "border-b border-slate-800 pb-8" : "pb-0"}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-300 font-mono">
                          {question.num}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-slate-100">{question.label}</h3>
                        <p className="mt-1 text-sm text-slate-400 leading-6">{question.hint}</p>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => (
                        <OptionCard
                          key={option.value}
                          opt={option}
                          selected={formData[question.id]}
                          onSelect={(value) => onQuestionChange(question.id, value)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 border-t border-slate-800 pt-8">
              <button
                type="button"
                onClick={onAnalyzeRisk}
                disabled={loading}
                className="w-full rounded-[12px] bg-cyan-500 px-6 py-4 text-base font-extrabold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Analyzing…" : "Get my risk verdict →"}
              </button>

              {error && (
                <div className="mt-4 rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-200">
                  <span className="font-semibold text-red-100">Connection error:</span> {error}
                </div>
              )}

              {loading && <Scanning />}
              {result && <ResultPanel result={result} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
