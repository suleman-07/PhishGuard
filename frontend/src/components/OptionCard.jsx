import { tierColor } from "../utils/constants";

export default function OptionCard({ opt, selected, onSelect }) {
  const active = selected === opt.value;
  const activeColor = tierColor[opt.tier];

  return (
    <button
      type="button"
      onClick={() => onSelect(opt.value)}
      className={`relative flex-1 min-w-[130px] rounded-[10px] border p-4 text-left transition-all duration-150 focus:outline-none ${
        active ? "bg-slate-900" : "bg-slate-800 hover:bg-slate-700"
      }`}
      style={{
        borderColor: active ? activeColor : undefined,
        backgroundColor: active ? `${activeColor}22` : undefined,
      }}
    >
      <div
        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg mb-2 text-[12px] font-bold transition-all duration-150 ${
          active ? "text-black" : "text-slate-400"
        }`}
        style={{ backgroundColor: active ? `${activeColor}22` : "#0F1B2B" }}
      >
        {opt.tier === "safe" ? "✓" : opt.tier === "warn" ? "!" : "✕"}
      </div>
      <div className={`mb-1 text-sm font-semibold ${active ? "text-white" : "text-slate-100"}`}>
        {opt.label}
      </div>
      <p className="text-xs leading-5 text-slate-400">{opt.note}</p>
      {active && (
        <span
          className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: activeColor }}
        />
      )}
    </button>
  );
}
