import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import TickerBar from "../components/TickerBar";
import StatsGrid from "../components/StatsGrid";
import ScannerSection from "../components/ScannerSection";
import Footer from "../components/Footer";
import { submitRiskRequest } from "../services/api";
import { initialFormData } from "../utils/constants";

export default function HomePage({ onSignOut }) {
  const [isMounted, setIsMounted] = useState(false);
  const [scanMode, setScanMode] = useState("url");
  const [urlText, setUrlText] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scanRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleQuestionChange = (id, value) => {
    setFormData((previous) => ({ ...previous, [id]: value }));
    setResult(null);
    setError(null);
  };

  const handleModeChange = (mode) => {
    setScanMode(mode);
    setResult(null);
    setError(null);
  };

  const handleAnalyzeRisk = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = scanMode === "url"
      ? { mode: scanMode, url: urlText.trim() }
      : { mode: "manual", ...formData };

    if (scanMode === "url" && !urlText.trim()) {
      setLoading(false);
      alert("Please enter a URL first.");
      return;
    }

    try {
      const data = await submitRiskRequest(payload);
      if (data.status === "success") {
        setResult(data);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch {
      setError("Cannot reach the backend. Ensure Flask is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToScan = () => scanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar onSignOut={onSignOut} onScan={scrollToScan} />
      <div className={isMounted ? "animate-fadeUp" : "opacity-0"}>
        <HeroSection onScan={scrollToScan} />
      </div>
      <TickerBar />
      <StatsGrid />
      <ScannerSection
        scanRef={scanRef}
        scanMode={scanMode}
        onModeChange={handleModeChange}
        urlText={urlText}
        onUrlChange={setUrlText}
        formData={formData}
        onQuestionChange={handleQuestionChange}
        onAnalyzeRisk={handleAnalyzeRisk}
        loading={loading}
        error={error}
        result={result}
      />
      <Footer />
    </div>
  );
}
