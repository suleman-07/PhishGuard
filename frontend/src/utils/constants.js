export const tierColor = {
  safe: "#10D98A",
  warn: "#F59E0B",
  danger: "#F04060",
};

export const questions = [
  {
    id: "https",
    num: "01",
    label: "Connection Security",
    hint: "Check for the padlock icon at the left of your browser's address bar.",
    options: [
      { value: "-1", label: "Padlock visible", note: "Encrypted connection", tier: "safe" },
      { value: "0", label: "No padlock", note: '"Not Secure" label shown', tier: "warn" },
      { value: "1", label: "Browser warning", note: "Certificate error page", tier: "danger" },
    ],
  },
  {
    id: "prefix",
    num: "02",
    label: "Domain Hyphens",
    hint: "Read the actual URL — does it contain hyphens between words?",
    options: [
      { value: "-1", label: "No hyphens", note: "e.g. paypal.com", tier: "safe" },
      { value: "1", label: "Hyphens present", note: "e.g. secure-login-paypal.com", tier: "danger" },
    ],
  },
  {
    id: "anchor",
    num: "03",
    label: "Link Destinations",
    hint: "Hover over buttons and nav links — check where they actually point.",
    options: [
      { value: "-1", label: "Stay on site", note: "Consistent domain throughout", tier: "safe" },
      { value: "0", label: "Some leave", note: "A few links exit the domain", tier: "warn" },
      { value: "1", label: "Mostly external", note: "Links lead to random domains", tier: "danger" },
    ],
  },
  {
    id: "subdomain",
    num: "04",
    label: "Domain Complexity",
    hint: "Count dot-separated segments in the address before .com / .net etc.",
    options: [
      { value: "-1", label: "Simple", note: "e.g. google.com", tier: "safe" },
      { value: "0", label: "Moderate", note: "e.g. accounts.google.com", tier: "warn" },
      { value: "1", label: "Complex", note: "e.g. secure.login.verify.site", tier: "danger" },
    ],
  },
];

export const stats = [
  { value: "1.8M+", label: "Phishing sites detected in 2024", icon: "⚠" },
  { value: "97.3%", label: "Model accuracy on test set", icon: "◎" },
  { value: "<1s", label: "Time to get your verdict", icon: "◷" },
  { value: "4", label: "Signals analyzed per scan", icon: "◈" },
];

export const modeTabs = [
  { mode: "url", label: "URL Input", icon: "🌐" },
  { mode: "manual", label: "Manual Signals", icon: "🎛" },
];

export const tickerItems = [
  { text: "Phishing attacks rose 58% in 2024", warn: true },
  { text: "Model trained on 11,000+ verified URLs", warn: false },
  { text: "1 in 99 emails is a phishing attempt", warn: true },
  { text: "4 signals · instant verdict · free to use", warn: false },
  { text: "Mobile users are 3× more susceptible", warn: true },
  { text: "No data stored — fully private", warn: false },
];

export const scanSteps = [
  "Parsing URL structure",
  "Checking domain signals",
  "Running classifier",
  "Computing risk score",
];

export const initialFormData = {
  https: "-1",
  prefix: "-1",
  anchor: "-1",
  subdomain: "-1",
};
