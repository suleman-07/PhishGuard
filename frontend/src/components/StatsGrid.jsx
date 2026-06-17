import { stats } from "../utils/constants";

export default function StatsGrid() {
  return (
    <section className="px-[clamp(20px,5vw,80px)] py-[clamp(48px,7vw,80px)]">
      <div className="mx-auto grid max-w-[1100px] gap-[1px] rounded-[16px] border border-slate-800 bg-slate-800 overflow-hidden">
        {stats.map((item, index) => (
          <div key={index} className="rounded-none bg-slate-950 px-6 py-7 sm:px-8">
            <p className="mb-3 text-xs uppercase tracking-[0.12em] text-slate-500 font-mono">
              {item.icon} {item.label.toUpperCase()}
            </p>
            <p className="text-[clamp(30px,4vw,40px)] font-black tracking-[-0.04em] text-slate-100 font-mono">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
