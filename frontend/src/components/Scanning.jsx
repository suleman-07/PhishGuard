import { useEffect, useState } from "react";
import { scanSteps } from "../utils/constants";

export default function Scanning() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep((current) => (current + 1) % scanSteps.length), 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-7">
      <div className="mb-4 flex justify-center gap-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-1 w-1 rounded-full bg-cyan-400 transition-opacity duration-200"
            style={{ opacity: index === step % 5 || index === (step + 1) % 5 ? 1 : 0.15 }}
          />
        ))}
      </div>
      <p className="text-xs font-mono uppercase tracking-[0.1em] text-slate-400">
        {scanSteps[step]}…
      </p>
    </div>
  );
}
