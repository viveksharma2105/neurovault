import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoGifIcon } from "../icons/LogoIcon";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const openSignIn = () => {
    setAuthMode("signin");
    setIsModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setIsModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <LogoGifIcon />
              </div>
              <span className="text-xl font-bold text-surface-900 tracking-tight">
                Neuro<span className="text-brand-600">Vault</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openSignIn}
                className="px-4 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </>
  );
};
