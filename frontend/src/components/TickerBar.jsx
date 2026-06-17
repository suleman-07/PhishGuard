import { tickerItems } from "../utils/constants";

export default function TickerBar() {
  return (
    <div className="overflow-hidden border-y border-slate-800 bg-slate-900 py-3">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(2)].map((_, repeatIndex) => (
            <span key={repeatIndex} className="flex">
              {tickerItems.map((item, index) => (
                <span key={index} className="flex items-center gap-2 px-11 text-sm text-slate-300" style={{ minWidth: 'auto' }}>
                  <span className={item.warn ? 'text-cyan-400' : 'text-emerald-400'}>{item.warn ? '⚠' : '✓'}</span>
                  <span>{item.text}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
