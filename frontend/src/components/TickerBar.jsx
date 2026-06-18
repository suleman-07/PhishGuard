import { tickerItems } from "../utils/constants";

export default function TickerBar() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <>
      <div className="relative overflow-hidden border-y border-slate-800 bg-slate-900 py-3">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-slate-900 to-transparent" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-slate-900 to-transparent" />

        {/* Moving Ticker */}
        <div className="ticker-track flex w-max">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-10 whitespace-nowrap text-sm text-slate-300"
            >
              <span
                className={
                  item.warn ? "text-cyan-400" : "text-emerald-400"
                }
              >
                {item.warn ? "⚠" : "✓"}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: scroll 25s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}