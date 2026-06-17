import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthView from "./components/AuthView";
import HomePage from "./pages/HomePage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("phishguard_token");
    if (savedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (token) => {
    if (token) {
      localStorage.setItem("phishguard_token", token);
    }
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("phishguard_token");
    setIsAuthenticated(false);
  };

  return (
    <GoogleOAuthProvider clientId="982892849647-aht8e965odd60j5l5dd4udrncgl22gkj.apps.googleusercontent.com">
      {isAuthenticated ? (
        <HomePage onSignOut={handleSignOut} />
      ) : (
        <AuthView onAuthSuccess={handleAuthSuccess} />
      )}
    </GoogleOAuthProvider>
  );
}
